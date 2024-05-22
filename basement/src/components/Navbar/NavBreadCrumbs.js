import { useLocation, useNavigate } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

const NavBreadCrumbs = ({ path }) => {
  const location = useLocation(); 
  const navigate = useNavigate();

  const paths = path ? path.split('/').slice(1) : location.pathname.split('/').slice(1);

  return (
    <Breadcrumb separator='>'>
      <BreadcrumbItem color='#A0AEC0'>
        <BreadcrumbLink color='#A0AEC0'>
        </BreadcrumbLink>
      </BreadcrumbItem>
      {paths.map((item,i) => {
        const linkPath = paths.slice(0,i+1).join('/');
        return (
          <BreadcrumbItem key={i} color={'#FFF'}>
            <BreadcrumbLink textTransform={'capitalize'} onClick={() => navigate(`/${linkPath}`,{ replace: true })} color={'#FFF'}>
              {item}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}

export default NavBreadCrumbs;