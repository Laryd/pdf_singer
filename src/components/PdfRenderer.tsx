"use client"
import {Document, Page, pdfjs} from "react-pdf"
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { Button } from "./ui/button";
import { ChevronDown, Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import {useResizeDetector} from 'react-resize-detector'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


interface PdfRendererProps {
  url: string
}
const PdfRenderer = ({url}: PdfRendererProps) => {
  const {toast} = useToast()
  const {width, ref} = useResizeDetector()
  return (
    <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
        <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between">
            <div className="flex items-center gap-1 5">
                <Button variant="ghost" aria-label="previous-page">
                  <ChevronDown className="h-4 w-4"/>
                </Button>
                <div className="flex items-center gap-1.5">
                  <Input className="w-12 h-8"/>
                  <p className="text-zinc-700 text-sm space-x-1">
                    <span>/</span>
                    <span>5</span>
                  </p>
                </div>
            </div>
        </div>
        <div className="flex-1 w-full max-h-screen">
          <div>
            <Document loading={
              <div>
                <Loader2/>
              </div>
            } 
            onLoadError={() => {
              toast({
                title: "Error loading PDF",
                description: "Please try again later",
                variant: "destructive"
              })
            }}
            file={url} className='max-h-full'>
              <Page pageNumber={1}/>

            </Document>
          </div>
        </div>
    </div>
  )
}

export default PdfRenderer