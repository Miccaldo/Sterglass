import { useMediaQuery } from 'react-responsive'

const MobileBreakpoint = ({ children }) => {
    const isMobile = useMediaQuery({ maxDeviceWidth: '767px' })
    return isMobile ? children : null
}

export default MobileBreakpoint;