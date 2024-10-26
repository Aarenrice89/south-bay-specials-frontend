import { useEffect, type EffectCallback } from 'react';

const useEffectOnce = (effect: EffectCallback): void => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(effect, []);
};

export default useEffectOnce;
