/*
TODO remove bootstrap and replace with MUI.
*/

import {
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Paper,
  TextField,
  Typography,
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function QuotationTable({ data, deleteByIndex, onClearAll, onDiscountChange }) {
  // Guard condition
  if (!data || data.length === 0) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>Quotation</Typography>
        <Typography variant="body1">
          <ShoppingCartIcon sx={{ mr: 1 }} /> No items
        </Typography>
      </Container>
    );
  }

  // Calculate total with discount applied once per row
  const total = data.reduce((acc, v) => acc + ((v.qty * v.ppu) - (v.discount || 0)), 0);
  const totalDiscount = data.reduce((acc, v) => acc + (v.discount || 0), 0);

  const handleDelete = (index) => {
    deleteByIndex(index);
  };

  const handleDiscountChange = (index, value) => {
    onDiscountChange(index, Number(value));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Quotation</Typography>
      <Button
        variant="outlined"
        startIcon={<ClearIcon />}
        onClick={onClearAll}
        sx={{ mb: 2 }}
      >
        Clear
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">-</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="center">Item</TableCell>
              <TableCell align="center">Price/Unit</TableCell>
              <TableCell align="center">Discount</TableCell>
              <TableCell align="center">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((v, i) => {
              // Calculate amount with discount applied once per row
              let amount = (v.qty * v.ppu) - (v.discount || 0);
              return (
                <TableRow key={i}>
                  <TableCell align="center">
                    <IconButton size="small" onClick={() => handleDelete(i)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">{v.qty}</TableCell>
                  <TableCell>{v.item}</TableCell>
                  <TableCell align="center">{v.ppu}</TableCell>
                  <TableCell align="center">
                    <TextField
                      type="number"
                      size="small"
                      inputProps={{ min: 0, style: { textAlign: 'center' } }}
                      value={v.discount || 0}
                      onChange={(e) => handleDiscountChange(i, e.target.value)}
                      sx={{ width: '100px' }}
                    />
                  </TableCell>
                  <TableCell align="right">{amount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} align="right">Total Discount</TableCell>
              <TableCell align="center">{totalDiscount}</TableCell>
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} align="right">Total</TableCell>
              <TableCell align="right">{total}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default QuotationTable;
