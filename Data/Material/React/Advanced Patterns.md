# 1. Advanced Patterns

## 1.1 Error Boundaries

```jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log to monitoring service
    errorService.log(error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback?.(this.state.error) ?? (
        <div role="alert">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Usage with granular boundaries
function App() {
  return (
    <ErrorBoundary fallback={(error) => <AppCrashPage error={error} />}>
      <Header />
      <ErrorBoundary fallback={() => <WidgetError />}>
        <Dashboard />
      </ErrorBoundary>
      <ErrorBoundary fallback={() => <ChatUnavailable />}>
        <ChatWidget />
      </ErrorBoundary>
    </ErrorBoundary>
  );
}
```

> **Note:** Error boundaries are still class components (as of React 19). No hooks equivalent yet, but libraries like `react-error-boundary` provide a functional API wrapper.

## 1.2 Higher-Order Components (HOC)

```jsx
// HOC for authorization
function withAuth(WrappedComponent, requiredRole) {
  return function AuthenticatedComponent(props) {
    const { user, isLoading } = useAuth();

    if (isLoading) return <Spinner />;
    if (!user) return <Navigate to="/login" />;
    if (requiredRole && user.role !== requiredRole) {
      return <Forbidden />;
    }

    return <WrappedComponent {...props} user={user} />;
  };
}

// Usage
const AdminDashboard = withAuth(Dashboard, 'admin');

// ✅ Modern alternative: custom hook + wrapper component
function RequireAuth({ role, children }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return <Spinner />;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Forbidden />;
  return children;
}
```

## 1.3 Controlled vs. Uncontrolled Pattern

```jsx
// Flexible component that can be either controlled or uncontrolled
function useControllableState({ value, defaultValue, onChange }) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = useCallback(
    (next) => {
      const nextValue = typeof next === 'function' ? next(currentValue) : next;

      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onChange?.(nextValue);
    },
    [isControlled, currentValue, onChange]
  );

  return [currentValue, setValue];
}

// Usage
function Toggle({ pressed, defaultPressed = false, onPressedChange, ...props }) {
  const [isPressed, setIsPressed] = useControllableState({
    value: pressed,
    defaultValue: defaultPressed,
    onChange: onPressedChange,
  });

  return (
    <button
      role="switch"
      aria-checked={isPressed}
      onClick={() => setIsPressed((p) => !p)}
      {...props}
    />
  );
}

// Can be used either way:
<Toggle defaultPressed={false} />                          // Uncontrolled
<Toggle pressed={value} onPressedChange={setValue} />      // Controlled
```

## 1.4 State Machines with useReducer

```jsx
const machine = {
  idle: {
    FETCH: 'loading',
  },
  loading: {
    RESOLVE: 'success',
    REJECT: 'error',
  },
  success: {
    FETCH: 'loading',
    RESET: 'idle',
  },
  error: {
    FETCH: 'loading',
    RESET: 'idle',
  },
};

function stateMachineReducer(state, event) {
  const nextStatus = machine[state.status]?.[event.type];

  if (!nextStatus) {
    console.warn(`Invalid transition: ${state.status} + ${event.type}`);
    return state; // Invalid transition — stay in current state
  }

  switch (event.type) {
    case 'FETCH':
      return { status: 'loading', data: state.data, error: null };
    case 'RESOLVE':
      return { status: 'success', data: event.payload, error: null };
    case 'REJECT':
      return { status: 'error', data: null, error: event.payload };
    case 'RESET':
      return { status: 'idle', data: null, error: null };
    default:
      return state;
  }
}
```

## 1.5 Portal Pattern

```jsx
import { createPortal } from 'react-dom';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
        <button onClick={onClose} aria-label="Close">×</button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
```

---
