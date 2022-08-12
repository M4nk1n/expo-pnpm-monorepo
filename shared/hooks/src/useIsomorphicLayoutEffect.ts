import { useEffect, useLayoutEffect } from 'react'

/**
 * This hook fixes this problem by switching between useEffect and useLayoutEffect following the execution environment.
 */
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
