// import icons for severity
import {
  CheckCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline'

interface BaseAlertProps {
  message: string
  severity: 'success' | 'info' | 'warning' | 'error'
}

export default function BaseAlert(props: BaseAlertProps) {
  return (
    <div
      className={`flex rounded-lg items-center p-2 gap-3 ${
        props.severity === 'success'
          ? 'bg-green-700/20'
          : props.severity === 'info'
          ? 'bg-sky-700/20'
          : props.severity === 'warning'
          ? 'bg-amber-700/20'
          : props.severity === 'error'
          ? 'bg-rose-700/20'
          : ''
      }`}
    >
      <div className="[&>*:first-child]:h-[2.5em]">
        {props.severity === 'success' ? (
          <CheckCircleIcon />
        ) : props.severity === 'info' ? (
          <InformationCircleIcon />
        ) : props.severity === 'warning' ? (
          <ExclamationTriangleIcon />
        ) : props.severity === 'error' ? (
          <ExclamationCircleIcon />
        ) : null}
      </div>
      <span>{props.message}</span>
    </div>
  )
}
