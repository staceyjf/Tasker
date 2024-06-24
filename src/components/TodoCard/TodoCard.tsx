import {
  Card,
  Box,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  useTheme,
  Divider,
  Switch,
  CardHeader,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import dayjs from "dayjs";

// define the props
interface TodoCardProps {
  id: number | undefined;
  createdAt: Date;
  dueDate?: Date;
  isComplete: boolean;
  title: string;
  task: string;
  colourHexCode?: string; // optional
  deleteOnClick: (id: number | undefined) => void;
  handleEdit: (id: number | undefined) => void;
  handleIsComplete: (id: number | undefined, isComplete: boolean) => void;
}

const TodoCard = ({
  id,
  createdAt,
  dueDate,
  isComplete,
  title,
  task,
  colourHexCode,
  deleteOnClick,
  handleEdit,
  handleIsComplete,
}: TodoCardProps) => {
  const theme = useTheme();

  const colourCatergorisation = colourHexCode;

  return (
    <Card
      sx={{
        maxWidth: "100%",
        rowGap: 1,
        marginBottom: 2,
        padding: 2,
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Divider
          orientation="vertical"
          flexItem
          sx={{ bgcolor: colourCatergorisation, width: "2px" }}
          data-testid="divider"
          data-divider-colour={colourCatergorisation}
        />
        <Box display="flex" flexDirection="column" flex="1">
          <CardHeader
            title={title}
            sx={{
              paddingTop: "0.5em",
              paddingBottom: 0,
            }}
            titleTypographyProps={{
              variant: "h6",
              color: theme.palette.common.white,
            }}
          />
          <CardContent sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.common.white,
                display: "block",
                textDecoration: isComplete ? "line-through" : "none",
              }}
              data-testid="todo-status"
              data-completed={isComplete ? "crossed-out" : "not-crossed"}
            >
              {task}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.common.white,
                display: "block",
                marginBottom: "-3px",
                textDecoration: isComplete ? "line-through" : "none",
              }}
            >
              Created on {dayjs(createdAt).format("DD-MM-YY")}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.common.white,
                display: "block",
                textDecoration: isComplete ? "line-through" : "none",
              }}
            >
              Due by {dayjs(dueDate).format("DD-MM-YY")}
            </Typography>
          </CardContent>
        </Box>
        <CardActions>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <IconButton
              aria-label="edit"
              color="secondary"
              sx={{
                "&:hover": {
                  backgroundColor: theme.palette.primary.light,
                },
              }}
              size="small"
              onClick={() => handleEdit(id)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="delete"
              color="secondary"
              sx={{
                "&:hover": {
                  backgroundColor: theme.palette.primary.light,
                },
              }}
              size="small"
              onClick={() => deleteOnClick(id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
            <Switch
              aria-label="task status"
              id={id?.toString()}
              checked={isComplete}
              onChange={() => handleIsComplete(id, !isComplete)}
              disableRipple
              color="default"
              size="small"
            />
          </Box>
        </CardActions>
      </Box>
    </Card>
  );
};

export default TodoCard;
