import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  toolbarTitle: {
    flex: 1,
  },
}));

const title = "SCHEDULER SIMULATOR"

export default function Header() {
  const classes = useStyles();

  return (
    <Toolbar className={classes.toolbar}>
        <Typography
          component="h3"
          variant="h3"
          color="primary"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
    </Toolbar>
  );
}
