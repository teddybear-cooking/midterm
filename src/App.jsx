/*
TODO remove bootstrap and replace with MUI.
*/

import { useState, useRef } from "react";
import {
  Container,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Box
} from "@mui/material";
import QuotationTable from "./QuotationTable";
import productsData from "./data/products.json";

function App() {
  const itemRef = useRef();
  const qtyRef = useRef();

  const [dataItems, setDataItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(productsData.products[0].code);
  const [ppu, setPpu] = useState(productsData.products[0].price);

  const addItem = () => {
    let item = productsData.products.find((v) => v.code === selectedProduct);
    const newItemData = {
      item: item.name,
      ppu: Number(ppu),
      qty: Number(qtyRef.current.value),
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
          <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Item</InputLabel>
                <Select
                  value={selectedProduct}
                  onChange={handleProductChange}
                  label="Item"
                >
                  {productsData.products.map((p) => (
                    <MenuItem key={p.code} value={p.code}>
                      {p.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Price Per Unit"
                type="number"
                value={ppu}
                onChange={(e) => setPpu(Number(e.target.value))}
                fullWidth
              />

              <TextField
                label="Quantity"
                type="number"
                inputRef={qtyRef}
                defaultValue={1}
                inputProps={{ min: 1 }}
                fullWidth
              />

              <Button
                variant="contained"
                onClick={addItem}
                fullWidth
                size="large"
              >
                Add
              </Button>
            </Box>
          </Paper>
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
