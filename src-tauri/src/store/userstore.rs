pub mod user_store {

    #![allow(unused)]
    use anyhow::{anyhow, Result};
    use std::collections::BTreeMap;
    use surrealdb::dbs::{Response, Session};
    use surrealdb::kvs::Datastore;
    use surrealdb::sql::{thing, Datetime, Object, Thing, Value};

    type DB = (Datastore, Session);

    pub async fn new() -> Result<()> {
        // let db: &DB = &(
        //     Datastore::new("users").await?,
        //     Session::for_db("rt_ns", "rt_db"),
        // );

        // Ok(())

        let db: &DB = &(
            Datastore::new("memory").await?,
            Session::for_db("my_ns", "my_db"),
        );

        Ok(())
    }
}
