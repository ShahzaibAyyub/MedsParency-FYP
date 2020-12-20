package main

import (
	"crypto/sha256"
	"encoding/gob"
	"fmt"
	"log"
	"net"
)

var countOfClients int = 0
var count int = 0
var chainHead *Block

func writeThread(c net.Conn) {

	for {
		//fmt.Println("han g agaye hai idhr :-", c.RemoteAddr())
		block11 := <-addblock
		//fmt.Println("contenttttttttttttttt:-", block11)
		//	block1 := &Block{"Satoshis100", nil}
		//	block2 := &Block{"Satoshi50Alice50", block1}
		gobEncoder := gob.NewEncoder(c)

		err := gobEncoder.Encode(block11)
		if err != nil {

			log.Println(err)

		}
	}
}

func readThread(c net.Conn) {

	for {

		var recvdBlock Block
		//fmt.Println("han g agaye hai idhr read mai :-", c.RemoteAddr())
		//fmt.Println("han g agaye hai idhr server read mai :-", c.RemoteAddr())
		dec := gob.NewDecoder(c)
		err := dec.Decode(&recvdBlock)
		//fmt.Println("han g agaye hai idhr read mai :-", c.RemoteAddr())
		if err != nil {

			//handle error

		}

		chainHead = InsertBlock(recvdBlock, chainHead)
		ListBlocks(chainHead)
		//fmt.Println("content:-", addblock, "client receive this info=", recvdBlock)
		//fmt.Println("server receive this info=", recvdBlock)

		addblock <- recvdBlock

		/*	var recvdBlock Block
			dec := gob.NewDecoder(c)
			err := dec.Decode(&recvdBlock)
			if err != nil {

				//handle error

			}
			fmt.Println("content:-", addblock, "mmmmmmm=", recvdBlock.drugName)
			addblock <- recvdBlock*/

	}

}

func handleConnection(c []net.Conn) {

	//log.Println("A client has connected",

	//	c[0].RemoteAddr())

	go readThread(c[count])
	go writeThread(c[count])
	count++
	/*	block1 := &Block{"Satoshis100", nil}
		block2 := &Block{"Satoshi50Alice50", block1}
		gobEncoder := gob.NewEncoder(c[0])
		err := gobEncoder.Encode(block2)
		if err != nil {

			log.Println(err)

		}*/

}

type Block struct {
	/*department      string
	drugName        string
	raw             string
	rawManu         string
	finalProduction string*/

	Name       string
	Department string
	Material   string

	CurrentHash  string
	PrevHash     string
	Transactions string
	PrevPointer  *Block
	/*	currentHash  string
		prevHash     string
		transactions string
		prevPointer  *Block*/
}

var addblock = make(chan Block)

func main() {

	connectionArray := make([]net.Conn, 3)
	ln, err := net.Listen("tcp", ":6000")

	var copy1 net.Listener = ln
	fmt.Printf("var1 = %T\n", typeof(copy1))
	if err != nil {

		log.Fatal(err)

	}
	for {
		//	fmt.Println("waiting for the client no", countOfClients+1, " to connect")
		if countOfClients < 3 {
			conn, err := ln.Accept()
			connectionArray[countOfClients] = conn
			countOfClients++

			fmt.Println("client no ", countOfClients, " connected:", connectionArray[countOfClients-1].RemoteAddr())

			if err != nil {

				log.Println(err)
				continue

			}
			fmt.Println(" connect")
			go handleConnection(connectionArray)
		}
		if countOfClients > 3 {
			fmt.Println(" puray hogaye ha")
			countOfClients++
		}
	}

}

/////////////////////////////////////    blockchain implemented   ////////////////////////////////////////

func AsSha256(o interface{}) string {
	h := sha256.New()
	h.Write([]byte(fmt.Sprintf("%v", o)))

	return fmt.Sprintf("%x", h.Sum(nil))
}

func CalculateHash(inputBlock *Block) string {
	//h := sha256.New()
	//a string:=AsSha256(*Block)
	//fmt.Println(inputBlock.transactions)
	temp := inputBlock.Department + inputBlock.Material + inputBlock.Name
	return (AsSha256(temp))
}

func InsertBlock(transactionsToInsert Block, chainHead *Block) *Block {
	var NewBlock *Block = new(Block)

	//NewBlock.Name =

	if chainHead == nil {
		//fmt.Println("genesis block hai")

		NewBlock.PrevPointer = nil

		NewBlock.PrevHash = ""
		//temp := transactionsToInsert.department+transactionsToInsert.material+transactionsToInsert.name
		NewBlock.Department = transactionsToInsert.Department
		NewBlock.Name = transactionsToInsert.Name
		NewBlock.Material = transactionsToInsert.Material
		NewBlock.CurrentHash = CalculateHash(NewBlock)
		//	fmt.Println(NewBlock.CurrentHash)
		//		fmt.Println(CalculateHash(NewBlock))
	}

	if chainHead != nil {
		//	fmt.Println("genesis block ni hai ye")
		NewBlock.Department = transactionsToInsert.Department
		NewBlock.Name = transactionsToInsert.Name
		NewBlock.Material = transactionsToInsert.Material
		NewBlock.CurrentHash = CalculateHash(NewBlock)

		NewBlock.PrevPointer = chainHead

		NewBlock.PrevHash = chainHead.CurrentHash
		//NewBlock.currentHash = CalculateHash(NewBlock)
		//	fmt.Println("previous block content :-", NewBlock.prevPointer.transactions)

	}
	fmt.Println("block created !!")
	NewBlock.CurrentHash = CalculateHash(NewBlock)
	//fmt.Println("done with creation")
	return NewBlock
}

func ListBlocks(chainHead *Block) {
	//fmt.Println("Blockchain Content :-")
	a := 1

	for tempBlock := chainHead; tempBlock != nil; tempBlock = tempBlock.PrevPointer {
		fmt.Println("Blockchain Content :-", a)
		a++
		fmt.Println("      Name of Drug : ", tempBlock.Name)
		fmt.Println("      Name of department : ", tempBlock.Department)
		fmt.Println("      Name of material produced/received : ", tempBlock.Department)
		fmt.Println("      Hash of the current block : ", tempBlock.CurrentHash)
		fmt.Println("      Hash of the previous block : ", tempBlock.PrevHash)
		fmt.Println("_________________________________________________")
	}
}

/*func ChangeBlock(oldTrans string, newTrans string, chainHead *Block) {
	//tempPerson := chainHead

	for tempBlock := chainHead; tempBlock != nil; tempBlock = tempBlock.prevPointer {

		for i := range tempBlock.transactions {
			if tempBlock.transactions[i] == oldTrans {
				//fmt.Println("aaaaaaaaaaaaaaaaaa")
				tempBlock.transactions[i] = newTrans
				tempBlock.currentHash = CalculateHash(chainHead)
				fmt.Println("hash updated=", tempBlock.currentHash, "         ", tempBlock.transactions)
				return
				// Found!
			}
		}

	}
}

func VerifyChain(chainHead *Block) {

	for tempBlock := chainHead; tempBlock != nil; tempBlock = tempBlock.prevPointer {
		if tempBlock.prevPointer != nil {
			if tempBlock.prevPointer.currentHash != tempBlock.prevHash {
				fmt.Println("Blockchain has been compromised")
			}
		}
	}

}
*/
