Printer = require('./escpos_printing.js');
fs = require('fs');
function init() {

Printer.ESCPOS_INIT();


var printerList = document.getElementById('printerlist');
printerList.remove(0);
var entry = document.createElement('option');
entry.text = "select Printer";
printerList.add(entry);

for (p=0;p<Printer.ESCPOS_PRINTERLIST.length;p++) {
		   var entry = document.createElement('option');
		   entry.text = Printer.ESCPOS_PRINTERLIST[p];
		   printerList.add(entry);
        }

}


function Test_print() {
//var list = document.getElementById("printerlist")
//var currentPrinter = list.options[list.selectedIndex].text;
          console.log('Test_print');

           Printer.ESCPOS_INIT();
           Printer.append(Printer.ESCPOS_CMD.RESET);
           Printer.append(Printer.ESCPOS_CMD.CENTER);
           Printer.append(Printer.ESCPOS_CMD.SETSIZE(3,3));
           Printer.append(Printer.ESCPOS_CMD.FONTB);
           Printer.append("Centered\nHeader\n\n");           
           Printer.append(Printer.ESCPOS_CMD.SETSIZE(1,1));
           Printer.append(Printer.ESCPOS_CMD.LEFT);
           Printer.append(Printer.ESCPOS_CMD.FONTA);
           Printer.append("Normal Text Font A\n");           
           Printer.append(Printer.ESCPOS_CMD.RIGHT);
           Printer.append(Printer.ESCPOS_CMD.FONTB);
           Printer.append("Right and Font B\n");           
           //Printer.append(Printer.ESCPOS_CMD.FONTA);
           //Printer.append(Printer.ESCPOS_CMD.LEFT);
           //Printer.append(Printer.ESCPOS_CMD.BOLD);
           //Printer.append("This must be important\n");           
           //Printer.append(Printer.ESCPOS_CMD.THICKUNDERLINE);
           //Printer.append("Because it is written first in bold letters ant then even undelined\n");           
           //Printer.append(Printer.ESCPOS_CMD.NOUNDERLINE);
           //Printer.append(Printer.ESCPOS_CMD.NORMAL);
           //Printer.append(Printer.ESCPOS_CMD.INVERT_ON);
           //Printer.append("But the world is only Black and White on Thermal Printers\n");           
           //Printer.append(Printer.ESCPOS_CMD.INVERT_OFF);
           //Printer.append(Printer.ESCPOS_CMD.UPSDOWN_ON);
           //Printer.append("And sometimes upside down\n");           
           //Printer.append(Printer.ESCPOS_CMD.UPSDOWN_OFF);
           //Printer.append("I dont speak Greek but it looks nice\n");           
           //Printer.append(Printer.ESCPOS_CP_EPSON.GREEK_1253);
           //Printer.append("ÖÄÜßüäöÖÄÜßüäö\n");
           Printer.append(Printer.ESCPOS_CMD.FEEDUNITS_ANDPRINT(125));
           Printer.append("This is a line after 125 motion units \n");           
           Printer.append(Printer.ESCPOS_CMD.FEEDLINES_ANDPRINT(5));
           Printer.append("This is the end after 5 lines \nand cutting off after 100 Units\n");           
           Printer.append(Printer.ESCPOS_CMD.FEEDCUT_PARTIAL(100));
           //Printer.append(Printer.ESCPOS_CMD.CUT_FULL);
           
           

        var sucess = Printer.ESCPOS_PRINT((resp) => { console.log(resp)});
        if(!sucess){
                alert(Printer.ESCPOS_LASTERROR);
        }           
}

function Test_Imageprint() {
var list = document.getElementById("printerlist")
var currentPrinter = list.options[list.selectedIndex].text;

    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');  
        canvas.width = 500;
        canvas.height = 161;
        ctx.fillStyle = 'white';
        ctx.fillRect(0,0,500,161);
        ctx.fillStyle = 'black';
        ctx.rect(10,10,100,100);
        ctx.stroke();
        ctx.font = '40px sans-serif';
        ctx.fillText('Hello World',125,60);
        document.body.appendChild(canvas);

    var fileName = 'c:\\Users\\bmc equip\\nw-sdk\\nw\\escposimage.jpg'; 
    console.log('image fileName',fileName);
    var image = document.createElement('img');
        image.onload = () => { 
          console.log('loaded');
          document.body.appendChild(image);
          console.log('image.width',image.width);
          console.log('image.height',image.height);
          //return;
          Printer.append(Printer.ESCPOS_CMD.LINE_SPACE(0));
          
          Printer.append(Printer.ESCPOS_IMAGEFILE(this.window,canvas,33,true,127));

          Printer.append(Printer.ESCPOS_CMD.FEEDCUT_PARTIAL(100));
          //Printer.append(Printer.ESCPOS_IMAGEFILE(this.window,fileName,33,true,127));
          var sucess = Printer.ESCPOS_PRINT(() => console.log('ESCPOS_PRINT',resp));
          if(!sucess){
                  alert(Printer.ESCPOS_LASTERROR);
          }
        }

        image.src = canvas.toDataURL('image/jpeg');

        //image.src = "data:image/jpg;base64," + fs.readFileSync(fileName).toString("base64");
        //image.src = canvas.toDataURL('image/png')  
        console.log('image.src',image.src);         
}

function Test_Barcodeprint() {
var list = document.getElementById("printerlist")
var currentPrinter = list.options[list.selectedIndex].text;


    Printer.ESCPOS_INIT();
    Printer.append(Printer.ESCPOS_BARCODE("12345678",70,3,80,0,2));
        var sucess = Printer.ESCPOS_PRINT(currentPrinter);
        if(!sucess){
                alert(Printer.ESCPOS_LASTERROR);
        }           

}

function Test_QRprint() {
var list = document.getElementById("printerlist")
var currentPrinter = list.options[list.selectedIndex].text;
    Printer.ESCPOS_INIT();
    Printer.append(Printer.ESCPOS_QRCODE("http://www.google.com",51,6,48));
        var sucess = Printer.ESCPOS_PRINT(currentPrinter);
        if(!sucess){
                alert(Printer.ESCPOS_LASTERROR);
        }           
}

function Test_Full() {
var list = document.getElementById("printerlist")
var currentPrinter = list.options[list.selectedIndex].text;


           Printer.ESCPOS_INIT();
           Printer.append(Printer.ESCPOS_CMD.RESET);
           Printer.append(Printer.ESCPOS_CMD.CENTER);
           Printer.append(Printer.ESCPOS_CMD.SETSIZE(3,3));
           Printer.append(Printer.ESCPOS_CMD.FONTB);
           Printer.append("Centered\nHeader\n\n");           
           Printer.append(Printer.ESCPOS_CMD.SETSIZE(1,1));
           Printer.append(Printer.ESCPOS_CMD.LEFT);
           Printer.append(Printer.ESCPOS_CMD.FONTA);
           Printer.append("Normal Text Font A\n");           
           Printer.append(Printer.ESCPOS_CMD.RIGHT);
           Printer.append(Printer.ESCPOS_CMD.FONTB);
           Printer.append("Right and Font B\n");           
           Printer.append(Printer.ESCPOS_CMD.FONTA);
           Printer.append(Printer.ESCPOS_CMD.LEFT);
           Printer.append(Printer.ESCPOS_CMD.BOLD);
           Printer.append("This must be important\n");           
           Printer.append(Printer.ESCPOS_CMD.THICKUNDERLINE);
           Printer.append("Because it is written first in bold letters ant then even undelined\n");           
           Printer.append(Printer.ESCPOS_CMD.NOUNDERLINE);
           Printer.append(Printer.ESCPOS_CMD.NORMAL);
           //Printer.append(Printer.ESCPOS_CMD.INVERT_ON);
           //Printer.append("But the world is only Black and White on Thermal Printers\n");           
           //Printer.append(Printer.ESCPOS_CMD.INVERT_OFF);
           Printer.append(Printer.ESCPOS_CMD.UPSDOWN_ON);
           Printer.append("And sometimes upside down\n");           
           Printer.append(Printer.ESCPOS_CMD.UPSDOWN_OFF);
           Printer.append("I dont speak Greek but it looks nice\n");           
           //Printer.append(Printer.ESCPOS_CP_EPSON.GREEK_1253);
           //Printer.append("ÖÄÜßüäöÖÄÜßüäö\n");
           //Printer.append(Printer.ESCPOS_CP_EPSON.MULTILINGUAL_850);
           Printer.append(Printer.ESCPOS_CMD.FEEDUNITS_ANDPRINT(125));
           Printer.append("This is a line after 125 motion units \n");           
           Printer.append(Printer.ESCPOS_CMD.FEEDLINES_ANDPRINT(5));
           Printer.append("Have a break after 5 lines \n");           
           Printer.append("\n");           
           Printer.append("What abour a Logo or other image \n\n");
           //Printer.append(Printer.ESCPOS_IMAGEFILE(this.window,'escposimage.jpg',33,true,127));
           Printer.append(Printer.ESCPOS_CMD.FEEDLINES_ANDPRINT(2));
           Printer.append("Looking nice, isnt it \n");
           Printer.append("but a QR code is more stylish nowadays \n");
           Printer.append(Printer.ESCPOS_CMD.RIGHT);
           Printer.append(Printer.ESCPOS_QRCODE("https://www.wikipedia.org/",51,6,48));
           Printer.append(Printer.ESCPOS_CMD.CENTER);
           Printer.append("How about some old fashioned Barcode\n\n");
           Printer.append(Printer.ESCPOS_BARCODE("12345678",70,3,80,0,2));
           Printer.append("Thankyou for trying out ESCPOS\n");
           

           
           
           
           
           Printer.append(Printer.ESCPOS_CMD.FEEDCUT_PARTIAL(100));
           
           

        var sucess = Printer.ESCPOS_PRINT(currentPrinter);
        if(!sucess){
                alert(Printer.ESCPOS_LASTERROR);
        }               
}


