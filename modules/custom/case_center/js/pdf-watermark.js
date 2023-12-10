const {
    degrees,
    PDFDocument,
    rgb,
    StandardFonts
} = PDFLib

async function modifyPdf(file, name, type) {
    // Fetch an existing PDF document
    const url = file
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes)

    // Embed the Helvetica font
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const TimesRomanItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic)

    // Get the first page of the document
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]

    // Get the width and height of the first page
    pages.forEach(page => {
        const {
            width,
            height
        } = page.getSize()

        // Draw a string of text diagonally across the first page
        page.drawText('This document is authorized for personal use only by ' + name + 'of iima till 02nd March ,2023.', {
            x: 30,
            y: height / 2 + 380,
            size: 10,
            font: TimesRomanItalic,
            color: rgb(0.10, 0.10, 0.40),
            //rotate: degrees(-45),
        })
        page.drawText('It shall not be reproduced or distributed without express written permission from Indian Institute of Management, Ahmedabad..', {
            x: 30,
            y: height / 2 + 370,
            size: 10,
            font: TimesRomanItalic,
            color: rgb(0.10, 0.10, 0.40),
            //rotate: degrees(-45),
        })

        // Draw a string of text diagonally across the first page
        if (type == "Inspection Copy") {
            page.drawText('Inspection Copy', {
                x: 50,
                y: height / 2 + 250,
                size: 80,
                font: helveticaFont,
                color: rgb(0.60, 0.60, 0.60),
                rotate: degrees(-40),
                opacity: 0.40,
            })
        }
    })

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()

    // Trigger the browser to download the PDF document
    download(pdfBytes, "case.pdf", "application/pdf");
}

jQuery(".pdf-download").click(function() {
    var name = jQuery('a.user-menu.user-logedin-name span').text();
    var classes = jQuery(this).attr("class");
    var url = classes.replace(' pdf-download', '');
    var type = jQuery(this).children('span').text()
    modifyPdf(url, name, type);
});