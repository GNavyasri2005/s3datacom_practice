
import { useRef, useState } from "react";


function ProductInvoice() {

    // useState: Store product information
    const [products, setProducts] = useState([]);

    // useRef: Access input elements
    const pidRef = useRef(null);
    const pnameRef = useRef(null);
    const priceRef = useRef(null);
    const quantityRef = useRef(null);

    // Function to add product
    function addProduct() {

        // Get values using useRef
        let pid = pidRef.current.value;
        let pname = pnameRef.current.value;
        let price = Number(priceRef.current.value);
        let quantity = Number(quantityRef.current.value);

        // Validate input
        if (
            pid.trim() === "" ||
            pname.trim() === "" ||
            price <= 0 ||
            quantity <= 0 ||
            priceRef.current.value === "" ||
            quantityRef.current.value === ""
        ) {
            alert("Please enter all product details correctly");
            return;
        }

        // Create product object
        let newProduct = {
            pid: pid,
            pname: pname,
            price: price,
            quantity: quantity,
            total: price * quantity
        };

        // Add product to array
        setProducts([...products, newProduct]);

        // Clear input fields using useRef
        pidRef.current.value = "";
        pnameRef.current.value = "";
        priceRef.current.value = "";
        quantityRef.current.value = "";

        // Focus on first input
        pidRef.current.focus();
    }

    // Calculate subtotal
    let subtotal = products.reduce(
        (sum, item) => sum + item.total, 0
    );

    // Calculate discount
    let discountRate = 0;

    if (subtotal >= 10000) {
        discountRate = 15;
    }
    else if (subtotal >= 5000) {
        discountRate = 10;
    }
    else if (subtotal >= 1000) {
        discountRate = 5;
    }

    let discount = subtotal * discountRate / 100;

    // Calculate amount after discount
    let afterDiscount = subtotal - discount;

    // Calculate GST
    let gst = afterDiscount * 18 / 100;

    // Calculate final amount
    let finalAmount = afterDiscount + gst;

    // Delete product
    function deleteProduct(index) {

        let updatedProducts = products.filter(
            (item, i) => i !== index
        );

        setProducts(updatedProducts);
    }

    return (

        <div className="container">

            <h1>Product Invoice Application</h1>

            {/* Product Form */}

            <div className="form-section">

                <h2>Enter Product Details</h2>

                <input
                    type="text"
                    placeholder="Product ID"
                    ref={pidRef}
                />

                <input
                    type="text"
                    placeholder="Product Name"
                    ref={pnameRef}
                />

                <input
                    type="number"
                    placeholder="Price"
                    min="0"
                    ref={priceRef}
                />

                <input
                    type="number"
                    placeholder="Quantity"
                    min="1"
                    ref={quantityRef}
                />

                <button onClick={addProduct}>
                    Add Product
                </button>

            </div>

            {/* Product List */}

            {products.length > 0 && (

                <div className="invoice">

                    <h2>Product Details</h2>

                    <table>

                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th className="no-print">Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {products.map((item, index) => (

                                <tr key={index}>

                                    <td>{item.pid}</td>
                                    <td>{item.pname}</td>
                                    <td>₹{item.price.toFixed(2)}</td>
                                    <td>{item.quantity}</td>
                                    <td>₹{item.total.toFixed(2)}</td>

                                    <td className="no-print">

                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteProduct(index)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                    {/* Invoice Summary */}

                    <div className="summary">

                        <h2>Invoice Summary</h2>

                        <p>
                            Subtotal:
                            <span>₹{subtotal.toFixed(2)}</span>
                        </p>

                        <p>
                            Discount ({discountRate}%):
                            <span>₹{discount.toFixed(2)}</span>
                        </p>

                        <p>
                            After Discount:
                            <span>₹{afterDiscount.toFixed(2)}</span>
                        </p>

                        <p>
                            GST (18%):
                            <span>₹{gst.toFixed(2)}</span>
                        </p>

                        <h2 className="final">
                            Final Amount: ₹{finalAmount.toFixed(2)}
                        </h2>

                    </div>

                    <button
                        className="print-btn no-print"
                        onClick={() => window.print()}
                    >
                        Print Invoice
                    </button>

                </div>

            )}

        </div>

    );
}

export default ProductInvoice;
