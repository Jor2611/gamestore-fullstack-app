import { DocumentIcon, FulgerIcon, RocketIcon } from "./components/Icons/Icons";

const routes = [
  {
    to: "/games",
    label: "Games",
    icon: <RocketIcon color='inherit' />
  },
  {
    to: "/keys",
    label: "Key Management",
    icon: <FulgerIcon color='inherit' />
  },
  {
    to: "/orders",
    label: "Orders",
    icon: <DocumentIcon color='inherit' />
  }
];

export default routes;