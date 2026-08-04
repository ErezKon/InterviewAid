# PART 4: FASTAPI DEEP DIVE
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## 1.0 Architecture Overview

```mermaid
graph TB
    CLIENT[Client] --> |HTTP Request| MIDDLEWARE[Middleware Stack]
    MIDDLEWARE --> ROUTER[API Router]
    ROUTER --> DEPS[Dependency Injection]
    DEPS --> HANDLER[Route Handler]
    HANDLER --> SERVICE[Service Layer]
    SERVICE --> REPO[Repository Layer]
    REPO --> DB[(Database)]
    
    HANDLER --> |Pydantic Model| RESPONSE[Response Serialization]
    RESPONSE --> |JSON| CLIENT
    
    subgraph "FastAPI Internals"
        MIDDLEWARE
        ROUTER
        DEPS
        HANDLER
        RESPONSE
    end
    
    subgraph "Business Logic"
        SERVICE
        REPO
    end
```

## 1.1 Project Structure

```
my_api/
├── app/
│   ├── __init__.py
│   ├── main.py                # Application factory
│   ├── config.py              # Settings management
│   ├── dependencies.py        # Shared dependencies
│   │
│   ├── models/                # Pydantic models (schemas)
│   │   ├── __init__.py
│   │   ├── base.py
│   │   ├── user.py
│   │   └── product.py
│   │
│   ├── api/                   # Route handlers
│   │   ├── __init__.py
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── router.py      # V1 router aggregation
│   │   │   ├── users.py
│   │   │   └── products.py
│   │   └── v2/
│   │       └── ...
│   │
│   ├── services/              # Business logic
│   │   ├── __init__.py
│   │   ├── user_service.py
│   │   └── product_service.py
│   │
│   ├── repositories/          # Data access
│   │   ├── __init__.py
│   │   ├── base.py
│   │   └── user_repository.py
│   │
│   ├── db/                    # Database setup
│   │   ├── __init__.py
│   │   ├── session.py
│   │   └── models.py          # SQLAlchemy ORM models
│   │
│   ├── middleware/
│   │   ├── __init__.py
│   │   ├── logging.py
│   │   └── cors.py
│   │
│   └── core/                  # Cross-cutting concerns
│       ├── __init__.py
│       ├── exceptions.py
│       ├── security.py
│       └── pagination.py
│
├── tests/
│   ├── conftest.py
│   ├── test_users.py
│   └── test_products.py
│
├── alembic/                   # DB migrations
│   ├── versions/
│   └── env.py
│
├── alembic.ini
├── pyproject.toml
├── Dockerfile
└── docker-compose.yml
```

## 1.2 Configuration

```python
# app/config.py
from pydantic_settings import BaseSettings
from pydantic import Field, PostgresDsn, field_validator
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # Application
    app_name: str = "My API"
    app_version: str = "1.0.0"
    debug: bool = False
    environment: str = "production"  # development, staging, production

    # Server
    host: str = "0.0.0.0"
    port: int = 8000
    workers: int = 4

    # Database
    database_url: str = "postgresql+asyncpg://user:pass@localhost:5432/mydb"
    db_pool_size: int = 20
    db_max_overflow: int = 10
    db_pool_timeout: int = 30

    # Redis
    redis_url: str = "redis://localhost:6379/0"

    # Security
    secret_key: str = Field(..., min_length=32)
    access_token_expire_minutes: int = 30
    refresh_token_expire_days: int = 7
    allowed_origins: list[str] = ["http://localhost:3000"]

    # External APIs
    stripe_api_key: str = ""
    sendgrid_api_key: str = ""

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "case_sensitive": False,
    }

    @field_validator("environment")
    @classmethod
    def validate_environment(cls, v: str) -> str:
        allowed = {"development", "staging", "production"}
        if v not in allowed:
            raise ValueError(f"environment must be one of {allowed}")
        return v


@lru_cache
def get_settings() -> Settings:
    return Settings()
```

## 1.3 Pydantic Models (Schemas)

```python
# app/models/base.py
from pydantic import BaseModel, ConfigDict
from datetime import datetime


class BaseSchema(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,  # allows ORM model → Pydantic model
        populate_by_name=True,
        str_strip_whitespace=True,
    )


class TimestampMixin(BaseModel):
    created_at: datetime
    updated_at: datetime


class PaginatedResponse(BaseModel):
    items: list
    total: int
    page: int
    page_size: int
    total_pages: int
```

```python
# app/models/user.py
from pydantic import BaseModel, Field, EmailStr, field_validator, model_validator
from datetime import datetime
from enum import Enum
from typing import Self
from .base import BaseSchema, TimestampMixin


class UserRole(str, Enum):
    ADMIN = "admin"
    USER = "user"
    MODERATOR = "moderator"


# ─── INPUT MODELS (what the client sends) ───

class UserCreate(BaseSchema):
    """Schema for creating a user."""
    username: str = Field(
        ...,
        min_length=3,
        max_length=50,
        pattern=r"^[a-zA-Z0-9_-]+$",
        examples=["john_doe"],
    )
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=128)
    password_confirm: str
    full_name: str = Field(..., min_length=1, max_length=100)
    role: UserRole = UserRole.USER

    @field_validator("username")
    @classmethod
    def username_lowercase(cls, v: str) -> str:
        return v.lower()

    @model_validator(mode="after")
    def passwords_match(self) -> Self:
        if self.password != self.password_confirm:
            raise ValueError("Passwords do not match")
        return self


class UserUpdate(BaseSchema):
    """Schema for updating a user — all fields optional."""
    full_name: str | None = Field(None, min_length=1, max_length=100)
    email: EmailStr | None = None
    role: UserRole | None = None


class UserFilters(BaseModel):
    """Query parameters for filtering users."""
    role: UserRole | None = None
    search: str | None = Field(None, max_length=100)
    is_active: bool | None = None
    created_after: datetime | None = None
    created_before: datetime | None = None


# ─── OUTPUT MODELS (what the API returns) ───

class UserResponse(BaseSchema, TimestampMixin):
    """Full user response (excludes password)."""
    id: int
    username: str
    email: EmailStr
    full_name: str
    role: UserRole
    is_active: bool


class UserBrief(BaseSchema):
    """Minimal user info for lists, references."""
    id: int
    username: str
    full_name: str


class UserListResponse(BaseModel):
    items: list[UserResponse]
    total: int
    page: int
    page_size: int
```

## 1.4 Database Layer (SQLAlchemy 2.0 Async)

```python
# app/db/session.py
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    create_async_engine,
    async_sessionmaker,
)
from sqlalchemy.orm import DeclarativeBase
from app.config import get_settings

settings = get_settings()

engine = create_async_engine(
    settings.database_url,
    echo=settings.debug,
    pool_size=settings.db_pool_size,
    max_overflow=settings.db_max_overflow,
    pool_timeout=settings.db_pool_timeout,
    pool_pre_ping=True,  # verify connections before using
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


class Base(DeclarativeBase):
    pass


async def get_db() -> AsyncSession:
    """FastAPI dependency for database sessions."""
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
```

```python
# app/db/models.py
from sqlalchemy import (
    String, Integer, Boolean, DateTime, ForeignKey, Text, Enum as SAEnum, Index
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from datetime import datetime
from .session import Base
import enum


class UserRoleDB(enum.Enum):
    ADMIN = "admin"
    USER = "user"
    MODERATOR = "moderator"


class UserDB(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255))
    full_name: Mapped[str] = mapped_column(String(100))
    role: Mapped[UserRoleDB] = mapped_column(
        SAEnum(UserRoleDB), default=UserRoleDB.USER
    )
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    # Relationships
    posts: Mapped[list["PostDB"]] = relationship(back_populates="author", lazy="selectin")

    # Composite index for common queries
    __table_args__ = (
        Index("ix_users_role_active", "role", "is_active"),
    )

    def __repr__(self) -> str:
        return f"<User(id={self.id}, username={self.username!r})>"


class PostDB(Base):
    __tablename__ = "posts"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(200))
    content: Mapped[str] = mapped_column(Text)
    author_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    is_published: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

    author: Mapped["UserDB"] = relationship(back_populates="posts")

    __table_args__ = (
        Index("ix_posts_author_published", "author_id", "is_published"),
    )
```

## 1.5 Repository Layer

```python
# app/repositories/base.py
from typing import TypeVar, Generic, Type, Sequence
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, delete, update
from app.db.session import Base

ModelType = TypeVar("ModelType", bound=Base)


class BaseRepository(Generic[ModelType]):
    """Generic repository with common CRUD operations."""

    def __init__(self, model: Type[ModelType], session: AsyncSession):
        self.model = model
        self.session = session

    async def get_by_id(self, id: int) -> ModelType | None:
        return await self.session.get(self.model, id)

    async def get_all(
        self,
        *,
        skip: int = 0,
        limit: int = 100,
    ) -> Sequence[ModelType]:
        stmt = select(self.model).offset(skip).limit(limit)
        result = await self.session.execute(stmt)
        return result.scalars().all()

    async def count(self) -> int:
        stmt = select(func.count()).select_from(self.model)
        result = await self.session.execute(stmt)
        return result.scalar_one()

    async def create(self, **kwargs) -> ModelType:
        instance = self.model(**kwargs)
        self.session.add(instance)
        await self.session.flush()
        await self.session.refresh(instance)
        return instance

    async def update_by_id(self, id: int, **kwargs) -> ModelType | None:
        instance = await self.get_by_id(id)
        if instance is None:
            return None
        for key, value in kwargs.items():
            if value is not None:
                setattr(instance, key, value)
        await self.session.flush()
        await self.session.refresh(instance)
        return instance

    async def delete_by_id(self, id: int) -> bool:
        instance = await self.get_by_id(id)
        if instance is None:
            return False
        await self.session.delete(instance)
        await self.session.flush()
        return True
```

```python
# app/repositories/user_repository.py
from sqlalchemy import select, or_, func
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.models import UserDB
from app.models.user import UserFilters
from .base import BaseRepository


class UserRepository(BaseRepository[UserDB]):
    def __init__(self, session: AsyncSession):
        super().__init__(UserDB, session)

    async def get_by_username(self, username: str) -> UserDB | None:
        stmt = select(UserDB).where(UserDB.username == username)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def get_by_email(self, email: str) -> UserDB | None:
        stmt = select(UserDB).where(UserDB.email == email)
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def search(
        self,
        filters: UserFilters,
        skip: int = 0,
        limit: int = 50,
    ) -> tuple[list[UserDB], int]:
        """Search users with filters, returning (results, total_count)."""
        stmt = select(UserDB)
        count_stmt = select(func.count()).select_from(UserDB)

        # Apply filters dynamically
        conditions = []
        if filters.role:
            conditions.append(UserDB.role == filters.role.value)
        if filters.is_active is not None:
            conditions.append(UserDB.is_active == filters.is_active)
        if filters.search:
            search_term = f"%{filters.search}%"
            conditions.append(
                or_(
                    UserDB.username.ilike(search_term),
                    UserDB.full_name.ilike(search_term),
                    UserDB.email.ilike(search_term),
                )
            )
        if filters.created_after:
            conditions.append(UserDB.created_at >= filters.created_after)
        if filters.created_before:
            conditions.append(UserDB.created_at <= filters.created_before)

        if conditions:
            stmt = stmt.where(*conditions)
            count_stmt = count_stmt.where(*conditions)

        # Get total count
        total_result = await self.session.execute(count_stmt)
        total = total_result.scalar_one()

        # Get paginated results
        stmt = stmt.order_by(UserDB.created_at.desc()).offset(skip).limit(limit)
        result = await self.session.execute(stmt)
        users = list(result.scalars().all())

        return users, total

    async def exists(self, username: str = "", email: str = "") -> bool:
        """Check if a user with this username or email exists."""
        stmt = select(func.count()).select_from(UserDB).where(
            or_(UserDB.username == username, UserDB.email == email)
        )
        result = await self.session.execute(stmt)
        return result.scalar_one() > 0
```

## 1.6 Service Layer

```python
# app/services/user_service.py
from app.repositories.user_repository import UserRepository
from app.models.user import (
    UserCreate, UserUpdate, UserResponse, UserFilters, UserListResponse
)
from app.core.exceptions import NotFoundError, ConflictError
from app.core.security import hash_password


class UserService:
    def __init__(self, repo: UserRepository):
        self.repo = repo

    async def create_user(self, data: UserCreate) -> UserResponse:
        # Business rule: check uniqueness
        if await self.repo.exists(username=data.username, email=data.email):
            raise ConflictError("User with this username or email already exists")

        user = await self.repo.create(
            username=data.username,
            email=data.email,
            hashed_password=hash_password(data.password),
            full_name=data.full_name,
            role=data.role.value,
        )

        return UserResponse.model_validate(user)

    async def get_user(self, user_id: int) -> UserResponse:
        user = await self.repo.get_by_id(user_id)
        if user is None:
            raise NotFoundError(f"User {user_id} not found")
        return UserResponse.model_validate(user)

    async def update_user(self, user_id: int, data: UserUpdate) -> UserResponse:
        update_data = data.model_dump(exclude_unset=True)
        if not update_data:
            raise ValueError("No fields to update")

        user = await self.repo.update_by_id(user_id, **update_data)
        if user is None:
            raise NotFoundError(f"User {user_id} not found")

        return UserResponse.model_validate(user)

    async def delete_user(self, user_id: int) -> None:
        deleted = await self.repo.delete_by_id(user_id)
        if not deleted:
            raise NotFoundError(f"User {user_id} not found")

    async def list_users(
        self,
        filters: UserFilters,
        page: int = 1,
        page_size: int = 50,
    ) -> UserListResponse:
        skip = (page - 1) * page_size
        users, total = await self.repo.search(filters, skip=skip, limit=page_size)

        return UserListResponse(
            items=[UserResponse.model_validate(u) for u in users],
            total=total,
            page=page,
            page_size=page_size,
        )
```

## 1.7 Dependencies & Security

```python
# app/dependencies.py
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.repositories.user_repository import UserRepository
from app.services.user_service import UserService
from app.core.security import decode_token
from app.models.user import UserResponse

security = HTTPBearer()


def get_user_repository(
    session: AsyncSession = Depends(get_db),
) -> UserRepository:
    return UserRepository(session)


def get_user_service(
    repo: UserRepository = Depends(get_user_repository),
) -> UserService:
    return UserService(repo)


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    repo: UserRepository = Depends(get_user_repository),
) -> UserResponse:
    """Extract and validate the current user from JWT token."""
    token = credentials.credentials
    payload = decode_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    user = await repo.get_by_id(payload["sub"])
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    return UserResponse.model_validate(user)


def require_role(*roles: str):
    """Factory for role-checking dependencies."""
    async def role_checker(
        current_user: UserResponse = Depends(get_current_user),
    ) -> UserResponse:
        if current_user.role.value not in roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Requires one of roles: {', '.join(roles)}",
            )
        return current_user
    return role_checker
```

```python
# app/core/security.py
from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
import jwt
from app.config import get_settings

settings = get_settings()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


def create_access_token(user_id: int, role: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(
        minutes=settings.access_token_expire_minutes
    )
    payload = {
        "sub": user_id,
        "role": role,
        "exp": expire,
        "type": "access",
    }
    return jwt.encode(payload, settings.secret_key, algorithm="HS256")


def decode_token(token: str) -> dict | None:
    try:
        return jwt.decode(token, settings.secret_key, algorithms=["HS256"])
    except jwt.PyJWTError:
        return None
```

## 1.8 Exception Handling

```python
# app/core/exceptions.py
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
import logging

logger = logging.getLogger(__name__)


class AppException(Exception):
    def __init__(self, detail: str, status_code: int = 500):
        self.detail = detail
        self.status_code = status_code


class NotFoundError(AppException):
    def __init__(self, detail: str = "Resource not found"):
        super().__init__(detail, status_code=404)


class ConflictError(AppException):
    def __init__(self, detail: str = "Resource already exists"):
        super().__init__(detail, status_code=409)


class ForbiddenError(AppException):
    def __init__(self, detail: str = "Access denied"):
        super().__init__(detail, status_code=403)


def register_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(AppException)
    async def app_exception_handler(request: Request, exc: AppException):
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "error": {
                    "type": type(exc).__name__,
                    "detail": exc.detail,
                }
            },
        )

    @app.exception_handler(Exception)
    async def unhandled_exception_handler(request: Request, exc: Exception):
        logger.exception(f"Unhandled exception: {exc}")
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "error": {
                    "type": "InternalServerError",
                    "detail": "An unexpected error occurred",
                }
            },
        )
```

## 1.9 Route Handlers (API Endpoints)

```python
# app/api/v1/users.py
from fastapi import APIRouter, Depends, Query, status, Path
from app.models.user import (
    UserCreate, UserUpdate, UserResponse, UserFilters, UserListResponse
)
from app.services.user_service import UserService
from app.dependencies import get_user_service, get_current_user, require_role

router = APIRouter(prefix="/users", tags=["Users"])


@router.post(
    "/",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new user",
    description="Register a new user account. Returns the created user.",
)
async def create_user(
    data: UserCreate,
    service: UserService = Depends(get_user_service),
) -> UserResponse:
    return await service.create_user(data)


@router.get(
    "/",
    response_model=UserListResponse,
    summary="List users with filtering",
)
async def list_users(
    filters: UserFilters = Depends(),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(50, ge=1, le=100, description="Items per page"),
    service: UserService = Depends(get_user_service),
    _current_user: UserResponse = Depends(get_current_user),  # auth required
) -> UserListResponse:
    return await service.list_users(filters, page=page, page_size=page_size)


@router.get(
    "/{user_id}",
    response_model=UserResponse,
    summary="Get user by ID",
)
async def get_user(
    user_id: int = Path(..., ge=1),
    service: UserService = Depends(get_user_service),
    _current_user: UserResponse = Depends(get_current_user),
) -> UserResponse:
    return await service.get_user(user_id)


@router.patch(
    "/{user_id}",
    response_model=UserResponse,
    summary="Update user",
)
async def update_user(
    user_id: int = Path(..., ge=1),
    data: UserUpdate = ...,
    service: UserService = Depends(get_user_service),
    _current_user: UserResponse = Depends(require_role("admin")),
) -> UserResponse:
    return await service.update_user(user_id, data)


@router.delete(
    "/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete user",
)
async def delete_user(
    user_id: int = Path(..., ge=1),
    service: UserService = Depends(get_user_service),
    _current_user: UserResponse = Depends(require_role("admin")),
) -> None:
    await service.delete_user(user_id)


@router.get("/me", response_model=UserResponse, summary="Get current user profile")
async def get_me(
    current_user: UserResponse = Depends(get_current_user),
) -> UserResponse:
    return current_user
```

```python
# app/api/v1/router.py
from fastapi import APIRouter
from .users import router as users_router
# from .products import router as products_router

v1_router = APIRouter(prefix="/api/v1")
v1_router.include_router(users_router)
# v1_router.include_router(products_router)
```

## 1.10 Middleware

```python
# app/middleware/logging.py
import time
import uuid
import logging
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

logger = logging.getLogger("api")


class RequestLoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        request_id = str(uuid.uuid4())[:8]
        start_time = time.perf_counter()

        # Attach request_id to request state
        request.state.request_id = request_id

        logger.info(
            f"[{request_id}] → {request.method} {request.url.path}"
        )

        try:
            response = await call_next(request)
        except Exception as e:
            logger.error(f"[{request_id}] ✗ Unhandled: {e}")
            raise

        elapsed = (time.perf_counter() - start_time) * 1000
        logger.info(
            f"[{request_id}] ← {response.status_code} ({elapsed:.1f}ms)"
        )

        response.headers["X-Request-ID"] = request_id
        response.headers["X-Process-Time-Ms"] = f"{elapsed:.1f}"
        return response
```

## 1.11 Application Factory

```python
# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.config import get_settings
from app.api.v1.router import v1_router
from app.core.exceptions import register_exception_handlers
from app.middleware.logging import RequestLoggingMiddleware
from app.db.session import engine, Base

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown logic."""
    # ── STARTUP ──
    # Create tables (use Alembic in production)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # Initialize connection pools, caches, etc.
    print("🚀 Application started")

    yield  # ← Application runs here

    # ── SHUTDOWN ──
    await engine.dispose()
    print("👋 Application shut down")


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        description="Production API with FastAPI",
        docs_url="/docs" if settings.debug else None,
        redoc_url="/redoc" if settings.debug else None,
        lifespan=lifespan,
    )

    # Middleware (order matters — last added = first executed)
    app.add_middleware(RequestLoggingMiddleware)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Routes
    app.include_router(v1_router)

    # Exception handlers
    register_exception_handlers(app)

    # Health check
    @app.get("/health", tags=["System"])
    async def health_check():
        return {"status": "healthy", "version": settings.app_version}

    return app


app = create_app()

# Run: uvicorn app.main:app --reload
# Prod: gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

## 1.12 WebSockets & Streaming

```python
# app/api/v1/websocket.py
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import Any
import json

router = APIRouter()


class ConnectionManager:
    """Manages WebSocket connections and broadcasting."""

    def __init__(self):
        self.active_connections: dict[str, list[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, channel: str):
        await websocket.accept()
        self.active_connections.setdefault(channel, []).append(websocket)

    def disconnect(self, websocket: WebSocket, channel: str):
        self.active_connections.get(channel, []).remove(websocket)

    async def broadcast(self, channel: str, message: dict[str, Any]):
        for ws in self.active_connections.get(channel, []):
            try:
                await ws.send_json(message)
            except Exception:
                self.disconnect(ws, channel)


manager = ConnectionManager()


@router.websocket("/ws/{channel}")
async def websocket_endpoint(websocket: WebSocket, channel: str):
    await manager.connect(websocket, channel)
    try:
        while True:
            data = await websocket.receive_json()
            # Echo + broadcast
            await manager.broadcast(channel, {
                "type": "message",
                "channel": channel,
                "data": data,
            })
    except WebSocketDisconnect:
        manager.disconnect(websocket, channel)
        await manager.broadcast(channel, {
            "type": "system",
            "message": "A user has left",
        })


# ─── Server-Sent Events (SSE) ───
from fastapi.responses import StreamingResponse
import asyncio


@router.get("/stream/events")
async def event_stream():
    async def generate():
        for i in range(100):
            yield f"data: {{\"count\": {i}}}\n\n"
            await asyncio.sleep(1)

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache"},
    )
```

## 1.13 Background Tasks

```python
# app/api/v1/tasks.py
from fastapi import APIRouter, BackgroundTasks
import asyncio

router = APIRouter(prefix="/tasks", tags=["Tasks"])


def send_notification(email: str, message: str):
    """Runs in background after response is sent."""
    import time
    time.sleep(2)  # Simulate slow operation
    print(f"Notification sent to {email}: {message}")


@router.post("/notify")
async def notify_user(
    email: str,
    message: str,
    background_tasks: BackgroundTasks,
):
    """Returns immediately; notification sent in background."""
    background_tasks.add_task(send_notification, email, message)
    return {"status": "Notification queued"}
```

---

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━