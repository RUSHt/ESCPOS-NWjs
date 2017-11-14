Printer = require('./escpos_printing.js');

$$ = (qs) => [].slice.call(document.querySelectorAll(qs)); 
$ = (qs) => document.querySelector(qs);

fs = require('fs');

function init() {

  Printer.ESCPOS_INIT('COM11');

  fs.readdir(global.__dirname+'\\images',(e,d) => {
         $('#image-list').innerHTML = d.map(fileName => '<option>'+fileName+'</option>').join('');
  });
}

function Test_ImageFile() {
  
  var selected = $$('#image-list option')[$('#image-list').selectedIndex].innerHTML;

  var mime;

  switch ( selected.split('.').pop().toLowerCase() ) {
    case 'jpg': case 'jpeg': mime = "data:image/jpeg;base64,"; break;
    case 'bmp': mime = "data:image/bmp;base64,"; break;
    case 'gif': mime = "data:image/gif;base64,"; break;
    case 'png': mime = "data:image/png;base64,"; break;
    case 'svg': mime = "data:image/svg+xml;base64,"; break;
    default:
      return alert('Image type '+selected+' not supported');
  }

  var image = document.createElement('img');
      image.onload = () => printImage(image);
      image.src = mime + new Buffer(fs.readFileSync('images/'+selected)).toString('base64');

};

function printImage(image) {
    
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

        canvas.width = image.width;
        canvas.height = image.height;

        ctx.fillStyle = 'white';
        ctx.fillRect(0,0,canvas.width,canvas.height);

        ctx.drawImage(image,0,0);

        Printer.append(Printer.ESCPOS_CMD.LINE_SPACE(0));
          
        Printer.appendCanvas(canvas);

        Printer.append(Printer.ESCPOS_CMD.FEEDCUT_PARTIAL(100));

        Printer.ESCPOS_PRINT(resp => console.log('ESCPOS_PRINT',resp));
}

function Test_ImageHelloWorld() {
  console.log('Test Image Hello World');
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

      Printer.ESCPOS_INIT();

      Printer.append(Printer.ESCPOS_CMD.LINE_SPACE(0));
        
      Printer.appendCanvas(canvas);

      Printer.append(Printer.ESCPOS_CMD.FEEDCUT_PARTIAL(100));

      Printer.ESCPOS_PRINT(resp => console.log('ESCPOS_PRINT',resp));

}

function Text_TextHelloWorld() {
      console.log('Test Text Hello World');
      Printer.ESCPOS_INIT();

      Printer.append("Hello World\n"); 

      Printer.append(Printer.ESCPOS_CMD.FEEDCUT_PARTIAL(100));

      Printer.ESCPOS_PRINT(resp => console.log('ESCPOS_PRINT',resp));

}

function Test_Barcode() {
    console.log('Test BarCode');
    Printer.ESCPOS_INIT();
    
    Printer.append(Printer.ESCPOS_BARCODE("12345678",70,3,80,0,2));

    Printer.append(Printer.ESCPOS_CMD.FEEDCUT_PARTIAL(100));

    Printer.ESCPOS_PRINT(resp => console.log('ESCPOS_PRINT',resp));
         
}

function Test_QR() {
    console.log('Test QR');
    Printer.ESCPOS_INIT();

    Printer.append(Printer.ESCPOS_QRCODE("http://www.google.com",51,6,48));

    Printer.append(Printer.ESCPOS_CMD.FEEDCUT_PARTIAL(100));

    Printer.ESCPOS_PRINT(resp => console.log('ESCPOS_PRINT',resp));        
}


// End Of PA Test_Printing..

// Blwo are from Thomas Höbelt.


function Test_print() {
           
           console.log('Test Print Lots');

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
           
           

           Printer.ESCPOS_PRINT((resp) => { console.log(resp)});
          
}

function Test_Full() {

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
           Printer.ESCPOS_PRINT((resp) => console.log(resp));
             
}


