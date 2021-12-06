import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    // borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'left',
    overflowX: 'auto',
  },
  toolbarLink: {
    paddingRight: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    flexShrink: 0,
  },
}));

// const sections = List.of(
//   new HeaderTitle("Browse Projects", ROUTES.DASHBOARD),
//   new HeaderTitle("Submit Project", ROUTES.SUBMIT_PROJECT),
//   new HeaderTitle("Become a Mentor", ROUTES.BECOME_MENTOR),
//   new HeaderTitle("Find Mentors", ROUTES.FIND_MENTORS),
// )

const title = "SCHEDULER SIMULATOR"

export default function Header() {
  const classes = useStyles();

  return (
    <>
      <Toolbar className={classes.toolbar}>
          <Typography
            component="h2"
            variant="h4"
            color="primary"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
            {title}
          </Typography>
      </Toolbar>
    </>
  );
}
