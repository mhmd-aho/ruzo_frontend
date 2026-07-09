"use client";

import { OrderSchema } from "@/lib/schemas";

type Props = {
    order: OrderSchema;
};

export default function PrintBarcodeButton({ order }: Props) {
    if (!order.barcode) return null;

    const handlePrint = () => {
        const printWindow = window.open("", "_blank");
        if (!printWindow) {
            alert("Please allow pop-ups to print the barcode.");
            return;
        }

        const barcodeImageUrl = `https://bwipjs-api.metafloor.com/?bcid=code128&text=${encodeURIComponent(order.barcode)}&scale=3&rotate=N&includetext`;

        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Barcode - ${order.barcode}</title>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
                        
                        /* Set page dimensions for standard 4x6 inch (100mm x 150mm) shipping labels */
                        @page {
                            size: 4in 6in;
                            margin: 0;
                        }
                        
                        html, body {
                            width: 4in;
                            height: 6in;
                            margin: 0;
                            padding: 0;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background-color: #ffffff;
                            font-family: 'Montserrat', sans-serif;
                            -webkit-print-color-adjust: exact;
                            print-color-adjust: exact;
                        }
                        
                        .label-card {
                            border: 2px solid #000000;
                            width: 3.6in;
                            height: 5.6in;
                            padding: 20px;
                            box-sizing: border-box;
                            background: white;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                        }
                        
                        .header {
                            text-align: center;
                            font-weight: 700;
                            font-size: 16px;
                            text-transform: uppercase;
                            letter-spacing: 1px;
                            border-bottom: 2px solid #000000;
                            padding-bottom: 8px;
                            margin: 0 0 10px 0;
                        }
                        
                        .barcode-section {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            flex-grow: 1;
                            margin: 10px 0;
                        }
                        
                        .barcode-img {
                            width: 100%;
                            height: auto;
                            max-height: 120px;
                            object-fit: contain;
                        }
                        
                        .details-section {
                            border-top: 2px dashed #000000;
                            padding-top: 12px;
                            font-size: 12px;
                            line-height: 1.5;
                        }
                        
                        .row {
                            margin-bottom: 6px;
                            display: flex;
                        }
                        
                        .label {
                            font-weight: 700;
                            text-transform: uppercase;
                            font-size: 9px;
                            color: #555555;
                            width: 90px;
                            flex-shrink: 0;
                        }
                        
                        .value {
                            font-weight: 500;
                            color: #000000;
                        }
                        
                        .cod-value {
                            font-weight: 700;
                            font-size: 14px;
                            color: #000000;
                        }
                    </style>
                </head>
                <body>
                    <div class="label-card">
                        <div class="header">Wakilni Order #${order.id}</div>
                        <div class="barcode-section">
                            <img class="barcode-img" src="${barcodeImageUrl}" alt="Barcode ${order.barcode}" />
                        </div>
                        <div class="details-section">
                            <div class="row">
                                <span class="label">Recipient:</span>
                                <span class="value">${order.address.receiver_first_name} ${order.address.receiver_last_name}</span>
                            </div>
                            <div class="row">
                                <span class="label">Phone:</span>
                                <span class="value">${order.address.receiver_phone_number}</span>
                            </div>
                            <div class="row">
                                <span class="label">Area:</span>
                                <span class="value">${order.address.receiver_area}</span>
                            </div>
                            <div class="row">
                                <span class="label">COD Amount:</span>
                                <span class="cod-value">$${order.total_price}</span>
                            </div>
                        </div>
                    </div>
                    <script>
                        // Wait for barcode image to load before printing
                        window.onload = function() {
                            setTimeout(function() {
                                window.print();
                                window.close();
                            }, 300);
                        };
                    </script>
                </body>
            </html>
        `);
        printWindow.document.close();
    };

    return (
        <button
            onClick={handlePrint}
            className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-widest text-white bg-primary hover:bg-black px-6 h-12 transition-all duration-300 rounded-none cursor-pointer w-full sm:w-auto"
        >
            Print Barcode
        </button>
    );
}
