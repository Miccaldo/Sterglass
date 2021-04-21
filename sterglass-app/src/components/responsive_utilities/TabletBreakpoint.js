import { useMediaQuery } from 'react-responsive'

const TabletBreakpoint = ({ children }) => {
    const isTablet = useMediaQuery({ minDeviceWidth: '768px', maxDeviceWidth: '1024px' })
    return isTablet ? children : null
}

export default TabletBreakpoint;