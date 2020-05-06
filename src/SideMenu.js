import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Hidden from '@material-ui/core/Hidden'
import Drawer from '@material-ui/core/Drawer'

import { NavLink } from 'react-router-dom'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}))



const SideMenu = (props) => {
  const classes = useStyles()

  const { window } = props
  const { state } = props
  const { onMenuClick } = props
  const { mobileOpen } = props

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {state.tests.map((test) => (
          <ListItem button key={test.id} onClick={onMenuClick} >
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
    <nav className={classes.drawer} aria-label='mqf tests'>
      <Hidden smUp implementation='js'>
        <Drawer
          container={container}
          variant='temporary'
          anchor='left'
          open={mobileOpen}
          onClose={onMenuClick}
          classes={{ paper: classes.drawerPaper, }}
          modalProps={{ keepMounted: true, }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation='js'>
        <Drawer
          classes={{ paper: classes.drawerPaper, }}
          variant='permanent'
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  )
}

export default SideMenu