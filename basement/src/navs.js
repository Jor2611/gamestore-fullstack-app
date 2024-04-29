import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "./components/Icons/Icons";

var routes = [
  {
    to: "/games",
    label: "Games",
    icon: <RocketIcon color='inherit' />
  },
  {
    to: "/orders",
    label: "Orders",
    icon: <DocumentIcon color='inherit' />
  }
];

export default routes;