package main

import (
	"encoding/gob"
	"fmt"
	"log"
	"net"
)

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
}

func writeThread(c net.Conn) {

	/*var first string
	fmt.Println("Enter 1 to enter data: ")
	fmt.Scanln(&first)

	var manu string = "-"
	var raw string = "-"
	var packaging string = "-"
	var depName string = "-"
	if first == "1" {

		fmt.Println("Enter your department name : ")

		fmt.Scanln(&depName)

		fmt.Println("Enter drug name to enter : ")
		var name string
		fmt.Scanln(&name)

		if depName == "Storage" {
			fmt.Println("Enter the received raw material quantity: ")

			fmt.Scanln(&raw)

		}

		if depName == "Manufracturing" {

			fmt.Println("Enter the raw material quantity received in manufracturing section: ")

			fmt.Scanln(&manu)

		}

		if depName == "packaging" {
			fmt.Println("Enter the received packing material quantity: ")

			fmt.Scanln(&packaging)

		}

		block1 := &Block{depName, name, raw, manu, packaging, nil}

		fmt.Println("sending content:-", block1)
		gobEncoder := gob.NewEncoder(c)

		err := gobEncoder.Encode(block1)
		if err != nil {

			log.Println(err)

		}

	}*/
	// var then variable name then variable type
	//var first string

	// Taking input from user
	for {
		fmt.Println("Enter drug name to enter : ")
		var name string
		fmt.Scanln(&name)

		fmt.Println("Enter your department   : ")
		var name2 string
		fmt.Scanln(&name2)

		fmt.Println("Enter drug amount to enter : ")
		var name3 string
		fmt.Scanln(&name3)

	
		fmt.Println("sending content:-", block2)
		gobEncoder := gob.NewEncoder(c)

		err := gobEncoder.Encode(block2)
		if err != nil {

			log.Println(err)

		}
		status <- "done"
	}

}

func readThread(c net.Conn) {

	for {

		//var s string
		s := <-status
		var recvdBlock Block
		//fmt.Println("han g agaye hai idhr read mai :-", c.RemoteAddr())
		//fmt.Println("han g agaye hai idhr read mai :-", c.RemoteAddr())
		dec := gob.NewDecoder(c)
		err := dec.Decode(&recvdBlock)
		//fmt.Println("han g agaye hai idhr read mai :-", c.RemoteAddr())
		if err != nil {

			//handle error

		}
		//fmt.Println("content:-", addblock, "client receive this info=", recvdBlock)
		fmt.Println("client receive this info=", recvdBlock, "   with status = ", s)
		//addblock <- recvdBlock
	}
	//fmt.Println(addblock.Transaction)
	//fmt.Println(recvdBlock.PrevPointer.Transaction)

}

var status = make(chan string)

func main() {

	conn, err := net.Dial("tcp", "localhost:6000")
	if err != nil {

		//handle error

	}
	//	var recvdBlock Block
	//	dec := gob.NewDecoder(conn)
	//	err = dec.Decode(&recvdBlock)
	//	if err != nil {

	//handle error

	//	}

	check := false

	for {
		if check == false {
			//	go writeThread(conn)
			go readThread(conn)
			go writeThread(conn)
			check = true
		}
	}

	//	fmt.Println(recvdBlock.Transaction)
	//	fmt.Println(recvdBlock.PrevPointer.Transaction)

}
