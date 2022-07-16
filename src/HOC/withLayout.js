import { Flex } from '@chakra-ui/react';
import { CircleLoader } from 'components/Loader';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo } from 'react';
import { useStore } from 'store';

const withAuthentication = <P extends Record<string, any>>(
  Component: React.ComponentType<P>
): FC<P> =>
  observer((props) => {
    const router = useRouter();

    const {
      AuthStore: { isAuthenticated, isLoading, logout }
    } = useStore() as any; // as any added temporarily to avoid error

    const TTL = useMemo(() => isAuthenticated(), [isAuthenticated]);

    useEffect(() => {
      if (TTL === 0) {
        alert('Please Login');
        logout();
        router.push('/login');
      }
    }, [TTL, logout, router]);

    if (TTL === 0) return null;

    return !isLoading.login ? (
      <Component {...(props as P)} />
    ) : (
      <Flex w="100vw" h="100vh" direction="column" justifyContent="center" alignItems="center">
        <CircleLoader loading label="Loading..." />
      </Flex>
    );
  });

export default withAuthentication;
