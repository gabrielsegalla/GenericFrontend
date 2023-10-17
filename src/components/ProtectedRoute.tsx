import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

function ProtectedRoute({ children, requiredPermissions }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const authoritiesString = Cookies.get('authorities');
    console.log(authoritiesString)
    if (!authoritiesString) {
      router.push('/404');
    } else {
      const userAuthorities = authoritiesString.split(',');
      const hasRequiredPermissions = requiredPermissions.every(permission => userAuthorities.includes(permission));

      if (!hasRequiredPermissions) {
        router.push('/unauthorized');
      } else {
        setIsAuthorized(true);
      }
    }
  }, [router, requiredPermissions]);

  if (isAuthorized === null) {
    return null; // Evita renderização até que a verificação seja concluída
  }

  return children;
}

export default ProtectedRoute;
