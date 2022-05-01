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
        nameRoute:"Clients",
        route:"/manager/clients",
        icon: <AccountBalanceWalletIcon/>
      },
      {
        id: 3,
        nameRoute:"Transactions",
        route:"/manager/transactions",
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
        nameRoute: "Position Area",
        route: "/manager/positionArea",
        icon: <People/>
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
      },
      {
        id:10,
        nameRoute:"Interests",
        route: "/manager/interests",
        icon: <MoneyIcon/>
      },
      {
        id:11,
        nameRoute:"Credit Details",
        route: "/manager/creditdetails",
        icon: <MoneyIcon/>
      },
      {
        id:12,
        nameRoute:"Cuts",
        route: "/manager/cuts",
        icon: <MoneyIcon/>
      },
      {
        id:12,
        nameRoute:"Mortgages",
        route: "/manager/mortgages",
        icon: <MoneyIcon/>
      }
]

export const cashier = [
  {
    id:1,
    nameRoute:"Transactions",
    route: "/cashier/transactions",
    icon: <MoneyIcon/>
  },
  {
    id:2,
    nameRoute:"Cuts",
    route: "/cashier/cuts",
    icon: <MoneyIcon/>
  }
]

export const executives = [
  {
    id:1,
    nameRoute:"Transactions",
    route: "/executive/transactions",
    icon: <MoneyIcon/>
  },
  {
    id:2,
    nameRoute:"Cuts",
    route: "/executive/cuts",
    icon: <MoneyIcon/>
  },
  {
    id: 3,
    nameRoute:"Clients",
    route:"/executive/clients",
    icon: <AccountBalanceWalletIcon/>
  }
]