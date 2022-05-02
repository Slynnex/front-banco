import DashboardIcon from '@material-ui/icons/Dashboard';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import People from '@material-ui/icons/People';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BarChartIcon from '@material-ui/icons/BarChart';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PieChartIcon from '@material-ui/icons/PieChart';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import BookIcon from '@material-ui/icons/Book';

// import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
// import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
// import PersonIcon from '@material-ui/icons/Person';
// import MoneyIcon from '@material-ui/icons/Money';
// import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
// import WorkIcon from '@material-ui/icons/Work';

export const gerente = [
  {
    id: 1,
    nameRoute: "Dashboard",
    route: "/manager",
    icon: <DashboardIcon />
  },
  {
    id: 2,
    nameRoute: "Clients",
    route: "/manager/clients",
    icon: <People />
  },
  {
    id: 3,
    nameRoute: "Transactions",
    route: "/manager/transactions",
    icon: <CompareArrowsIcon />
  },
  {
    id: 4,
    nameRoute: "Executives",
    route: "/manager/executives",
    icon: <HowToRegIcon />
  },
  {
    id: 5,
    nameRoute: "Concepts",
    route: "/manager/concepts",
    icon: <BookIcon />
  },
  {
    id: 6,
    nameRoute: "Position Area",
    route: "/manager/positionArea",
    icon: <AssignmentIcon />
  },
  {
    id: 8,
    nameRoute: "Commissions",
    route: "/manager/comissions",
    icon: <BarChartIcon />
  },
  {
    id: 9,
    nameRoute: "Denominations",
    route: "/manager/denominations",
    icon: <MonetizationOnIcon />
  },
  {
    id: 10,
    nameRoute: "Interests",
    route: "/manager/interests",
    icon: <TrendingUpIcon />
  },
  {
    id: 11,
    nameRoute: "Credit Details",
    route: "/manager/creditdetails",
    icon: <CreditCardIcon />
  },
  {
    id: 12,
    nameRoute: "Cuts",
    route: "/manager/cuts",
    icon: <PieChartIcon />
  },
  {
    id: 12,
    nameRoute: "Mortgages",
    route: "/manager/mortgages",
    icon: <AccountBalanceIcon />
  }
]

export const cashier = [
  {
    id: 1,
    nameRoute: "Transactions",
    route: "/cashier/transactions",
    icon: <CompareArrowsIcon />
  },
  {
    id: 2,
    nameRoute: "Cuts",
    route: "/cashier/cuts",
    icon: <PieChartIcon />
  }
]

export const executives = [
  {
    id: 1,
    nameRoute: "Transactions",
    route: "/executive/transactions",
    icon: <CompareArrowsIcon />
  },
  {
    id: 2,
    nameRoute: "Cuts",
    route: "/executive/cuts",
    icon: <PieChartIcon />
  },
  {
    id: 3,
    nameRoute: "Clients",
    route: "/executive/clients",
    icon: <People />
  }
]