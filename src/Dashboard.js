import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ResponsiveNavigation from './ResponsiveNavigation'
import Divider from '@material-ui/core/Divider'
import Hidden from '@material-ui/core/Hidden'
import PropTypes from 'prop-types'
import { Link, NavLink } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  title: {
    fontSize: 14,
  },
  card: {
    minWidth: 275,
  },
}))

const Dashboard = (props) => {
  const classes = useStyles()

  const { window } = props
  const { state } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {state.tests.map((test) => (
          <ListItem button key={test.id}>
            <NavLink to={`/m/${test.id}`} style={{ textDecoration: 'none', color: 'initial' }}>
              <ListItemText primary={`[${test.mds}] ${test.name}`} />
            </NavLink>
          </ListItem>
        ))}
      </List>
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <div className={classes.root}>
      <ResponsiveNavigation state={state} onMenuClick={handleDrawerToggle} />
      <nav className={classes.drawer} aria-label="mqf tests">
        <Hidden smUp implementation="js">
          <Drawer
            container={container}
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{ paper: classes.drawerPaper, }}
            modalProps={{ keepMounted: true, }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="js">
          <Drawer
            classes={{ paper: classes.drawerPaper, }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
          <Container maxWidth="sm">
            <Card variant="outlined" className={classes.card}>
              <CardContent>
                <Typography variant="body2" component="p">
                  Select a MQF Test on the left to begin.
                </Typography>
                <Typography variant="body2" component="p">
                  TODO: Center the card
                </Typography>
              </CardContent>
            </Card>
          </Container>
      </main>
    </div>
  )
}

export default Dashboard