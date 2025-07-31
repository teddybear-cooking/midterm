import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Paper,
  Box
} from "@mui/material";

function ProductForm({ 
  selectedProduct, 
  ppu, 
  products, 
  onProductChange, 
  onPpuChange, 
  onAddItem 
}) {
  return (
    <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Item</InputLabel>
          <Select
            value={selectedProduct}
            onChange={onProductChange}
            label="Item"
          >
            {products.map((p) => (
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
          onChange={(e) => onPpuChange(Number(e.target.value))}
          fullWidth
        />

        <TextField
          label="Quantity"
          type="number"
          name="quantity"
          defaultValue={1}
          inputProps={{ min: 1 }}
          fullWidth
        />

        <Button
          variant="contained"
          onClick={onAddItem}
          fullWidth
          size="large"
        >
          Add
        </Button>
      </Box>
    </Paper>
  );
}

export default ProductForm; 