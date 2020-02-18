import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import Quagga from 'quagga';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-barcode-scanner',
  templateUrl: './barcode-scanner.component.html',
  styleUrls: ['./barcode-scanner.component.less']
})
export class BarcodeScannerComponent implements OnInit {
  barcode = '';
  readerType = 'ean_8_reader';
  readerStatus = false;

  constructor(private ref: ChangeDetectorRef, private router: Router) {
  }

  ngOnInit() {
  }

  startScanner(reader: string = '') {
    document.body.style.margin = '0';
    console.log(1);
    if (reader !== '') {
      this.readerType = reader;
    }
    this.readerStatus = true;
    this.barcode = '';
    this.ref.detectChanges();

    Quagga.onProcessed((result) => this.onProcessed(result));

    Quagga.onDetected((result) => this.onDetected(result));

    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: '#barcode-scanner',
        constraints: {
          width: {max: window.innerWidth},
          height: {max: window.innerHeight},
          aspectRatio: {min: 1, max: 100},
          facingMode: 'environment',
        },
      },
      locator: {
        patchSize: 'medium',
        halfSample: true
      },
      locate: true,
      numOfWorkers: 2,
      decoder: {
        readers: [this.readerType],
      }
    }, (err) => {
      if (err) {
        return console.log(err);
      }
      Quagga.start();
    });

    const scannerImage: HTMLElement = document.querySelector('#barcode-scanner > video');
    const scannerCanvas: HTMLElement = document.querySelector('#barcode-scanner > canvas');
    scannerImage.style.minWidth = window.innerWidth + 'px';
    scannerCanvas.style.minWidth = window.innerWidth + 'px';
    window.addEventListener('resize', () => {
      scannerImage.style.minWidth = window.innerWidth + 'px';
      scannerCanvas.style.minWidth = window.innerWidth + 'px';
    });
  }

  private onProcessed(result: any) {
    const drawingCtx = Quagga.canvas.ctx.overlay;
    const drawingCanvas = Quagga.canvas.dom.overlay;

    if (result) {
      if (result.boxes) {
        drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute('width'), 10), parseInt(drawingCanvas.getAttribute('height'), 10));
        result.boxes.filter((box) => {
          return box !== result.box;
        }).forEach((box) => {
          Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: 'green', lineWidth: 2});
        });
      }

      if (result.box) {
        Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: '#00F', lineWidth: 2});
      }

      if (result.codeResult && result.codeResult.code) {
        Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
      }
    }
  }

  private onDetected(result) {
    const code = result.codeResult.code;
    if (this.barcode !== code) {
      this.barcode = code;
      this.ref.detectChanges();
      Quagga.stop();
      this.router.navigate(['/food-facts', code]);
    }
  }
}
