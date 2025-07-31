/*
TODO remove bootstrap and replace with MUI.
*/

import { useState } from "react";
import { Container, Grid } from "@mui/material";
import QuotationTable from "./components/QuotationTable";
import ProductForm from "./components/ProductForm";
import productsData from "./data/products.json";

function App() {
  const [dataItems, setDataItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(productsData.products[0].code);
  const [ppu, setPpu] = useState(productsData.products[0].price);

  const addItem = (e) => {
    const form = e.target.closest('form');
    const quantity = form ? Number(form.quantity.value) : 1;
    
    let item = productsData.products.find((v) => v.code === selectedProduct);
    const newItemData = {
      item: item.name,
      ppu: Number(ppu),
      qty: quantity,
      discount: 0
    };

    // Check for existing item with same name and price
    const existingItemIndex = dataItems.findIndex(
      (item) => item.item === newItemData.item && item.ppu === newItemData.ppu
    );

    if (existingItemIndex !== -1) {
      // Merge quantities and discounts
      const updatedItems = [...dataItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        qty: updatedItems[existingItemIndex].qty + newItemData.qty,
        discount: updatedItems[existingItemIndex].discount + newItemData.discount
      };
      setDataItems(updatedItems);
    } else {
      setDataItems([...dataItems, newItemData]);
    }
  };

  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  };

  const handleClearAll = () => {
    setDataItems([]);
  };

  const handleDiscountChange = (index, value) => {
    const updatedItems = [...dataItems];
    updatedItems[index] = {
      ...updatedItems[index],
      discount: value
    };
    setDataItems(updatedItems);
  };

  const handleProductChange = (event) => {
    const code = event.target.value;
    setSelectedProduct(code);
    const item = productsData.products.find((v) => v.code === code);
    setPpu(item.price);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <form onSubmit={(e) => e.preventDefault()}>
            <ProductForm
              selectedProduct={selectedProduct}
              ppu={ppu}
              products={productsData.products}
              onProductChange={handleProductChange}
              onPpuChange={setPpu}
              onAddItem={addItem}
            />
          </form>
        </Grid>
        <Grid item xs={12} md={8}>
          <QuotationTable
            data={dataItems}
            deleteByIndex={deleteByIndex}
            onClearAll={handleClearAll}
            onDiscountChange={handleDiscountChange}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
