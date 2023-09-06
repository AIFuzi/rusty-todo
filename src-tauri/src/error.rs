use serde::{ser::Serializer, Serialize};

#[derive(Debug, thiserror::Error)]
pub enum TauriCommandError {
    #[error(transparent)]
    SqlxPgError(#[from] sqlx::Error),
}

impl Serialize for TauriCommandError {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}

pub type CommandResult<T, E = TauriCommandError> = anyhow::Result<T, E>;
