import PropTypes from "prop-types";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

// ----------------------------------------------------------------------

export default function ConfirmDialog({
  title,
  content,
  action,
  open,
  onClose,
  ...other
}) {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={onClose}
      {...other}
     
    >
      <DialogTitle
        sx={{
          pb: 1,
          fontSize: "1.1rem",
          fontWeight: 700,
          color: "#292524",
          textTransform: "none",
        }}
      >
        {title}
      </DialogTitle>

      {content && (
        <DialogContent
          sx={{
            pt: 1,
            pb: 2,
            color: "#78716c",
            fontSize: "0.875rem",
            lineHeight: 1.6,
            textTransform: "none",
          }}
        >
          {content}
        </DialogContent>
      )}

      <DialogActions
        sx={{
          px: 2,
          pb: 1.5,
          gap: 1,
        }}
      >
        <Button
          variant="outlined"
          color="inherit"
          onClick={onClose}
          sx={{
            borderRadius: 1.5,
            textTransform: "none",
            fontWeight: 600,
            color: "#57534e",
            borderColor: "#d6d3d1",

            "&:hover": {
              borderColor: "#a8a29e",
              bgcolor: "#fafaf9",
            },
          }}
        >
          Cancel
        </Button>

        {action}
      </DialogActions>
    </Dialog>
  );
}

// ----------------------------------------------------------------------

ConfirmDialog.propTypes = {
  action: PropTypes.node,
  content: PropTypes.node,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
};