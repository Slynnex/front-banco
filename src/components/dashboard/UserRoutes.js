import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import People from '@material-ui/icons/People';

import MoneyIcon from '@material-ui/icons/Money';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BookIcon from '@material-ui/icons/Book';
import WorkIcon from '@material-ui/icons/Work';

export const gerente = [
      {
        id: 1,
        nameRoute:"Dashboard",
        route:"/manager",
        icon: <DashboardIcon/>
      },
      {
        id: 2,
        nameRoute:"Accounts",
        route:"/manager/accounts",
        icon: <AccountBalanceWalletIcon/>
      },
      {
        id: 3,
        nameRoute:"Transfer",
        route:"/manager/transfer",
        icon: <CompareArrowsIcon/>
      },
      {
        id: 4,
        nameRoute:"Executives",
        route:"/manager/executives",
        icon: <People/>
      },
      {
        id:5,
        nameRoute:"Concepts",
        route:"/manager/concepts",
        icon: <BookIcon/>
      },
      {
        id:6,
        nameRoute: "Positions",
        route: "/manager/positions",
        icon: <People/>
      },
      {
        id:7,
        nameRoute:"Areas",
        route:"/manager/areas",
        icon: <WorkIcon/>
      },
      {
        id:8,
        nameRoute:"Comissions",
        route: "/manager/comissions",
        icon: <BookIcon/>
      },
      {
        id:9,
        nameRoute:"Denominations",
        route: "/manager/denominations",
        icon: <MoneyIcon/>
      }
]

export const cashier = [
  {
    id: 1,
    nameRoute:"Dashboard",
    route:"/cashier",
    icon: <DashboardIcon/>
  },
  {
    id: 2,
    nameRoute:"Withdraw Cash",
    route:"/cashier/accounts",
    icon: <MoneyIcon/>
  },
  {
    id: 3,
    nameRoute:"Card Replace",
    route:"/cashier/cardreplace",
    icon: <AccountBalanceWalletIcon/>
  },
  {
    id: 4,
    nameRoute:"Available Cash",
    route:"/cashier/availablecash",
    icon: <AttachMoneyIcon/>
  }
]