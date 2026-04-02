---
title: "Data Models"
date: 2026-04-02
navigation:
  title: Data Models
tags:
  - databases
  - book notes
  - system design
---

# Data Models

The long wait is over, it is finally here! No, not Winds of Winter, but the
second edition of
<a target='_blank' href='https://www.ebooks.com/en-de/book/347309662/designing-data-intensive-applications/martin-kleppmann/'>Designing
Data Intensive Applications</a>.

Here are my notes on data models. Very brief summary, trade-offs, use cases and
databases that are designed for them. There's a lot more in the book that I
don't cover here, like historic data models like Triple Stores, in deep examples
of everything and data models specifically for OLAP systems, which are outside
the scope of my work as a backend engineer.

## Relational Model

Data is organized into **relations** (tables), where each relation is an
unordered collection of **tuples** (rows). Queried using SQL (declarative). The
dominant model since the mid-1980s.

**Pros:**

- Strong support for joins, many-to-one, and many-to-many relationships
- Schema-on-write enforces data consistency
- Mature query optimizer handles complex queries efficiently
- Normalization avoids data duplication and inconsistency
- Secondary indexes allow efficient querying in both directions of a
  relationship

**Cons:**

- Impedance mismatch with object-oriented application code (requires ORM or
  manual translation)
- Shredding tree-structured data across multiple tables creates cumbersome
  schemas
- Rigid schema makes evolving data format operationally challenging on large
  tables
- Recursive/variable-length path queries (e.g., graph traversals) are verbose
  and awkward (WITH RECURSIVE)

**Typical use cases:**

- OLTP business applications (users, orders, products, payments)
- Data warehousing and business analytics (star/snowflake schemas)
- Any domain with significant many-to-many relationships

**Databases:** PostgreSQL, MySQL, SQLite, Oracle, SQL Server, CockroachDB,
Google Spanner, Amazon Aurora, SingleStore

## Document Model

Data is represented as **self-contained JSON (or XML/BSON) documents**,
typically with a tree structure of nested objects and arrays. Often associated
with schema-on-read and denormalization.

**Pros:**

- Better data locality: all related data in one document, fetched in one read
- Closer to object structures in application code (reduced impedance mismatch)
- Schema flexibility (schema-on-read): easy to evolve data format without
  migrations
- Natural fit for one-to-many / one-to-few relationships (tree-structured data)
- Good for user-defined ordering (arrays preserve order)

**Cons:**

- Weak or no support for joins in some implementations (must join in application
  code)
- Cannot refer directly to nested items within a document (some can, like
  MongoDB or PostgreSQL jsonb)
- Entire document must be rewritten on update (wasteful for frequent small
  updates)
- Many-to-many and many-to-one relationships are awkward: requires
  cross-document references
- Denormalization risks inconsistency when duplicated data needs updating

**Typical use cases:**

- User profiles, résumés, product catalogs (tree-structured, loaded as a whole)
- Content management systems
- Event/activity logs
- Any domain where data is heterogeneous or externally determined

**Databases:** MongoDB, Couchbase, Amazon DocumentDB, RethinkDB, CouchDB. Also:
JSON column support in PostgreSQL, MySQL, SQLite, Oracle

## Property Graph Model

Data is modeled as **vertices** (nodes) and **edges** (relationships), each with
a label and key-value properties. Any vertex can connect to any other vertex.
Queried with languages like Cypher, GQL.

**Pros:**

- Extremely flexible: heterogeneous data (people, locations, events) in one
  graph
- Efficient traversal of relationships (follow edges forward and backward)
- Variable-length path queries are natural and concise (e.g., `:WITHIN*0..`)
- Great evolvability: easy to extend with new vertex/edge types as requirements
  change
- Multiple relationship types coexist in the same structure

**Cons:**

- Edges connect only two vertices (no native higher-degree relationships without
  workarounds)
- Less mature tooling and ecosystem compared to relational databases
- Can be harder to reason about performance and indexing for complex queries
- Not well suited for tabular/analytical workloads

**Typical use cases:**

- Social networks (people know people)
- Knowledge graphs and search engines (entities and their relationships)
- Fraud detection (tracing chains of transactions)
- Network/infrastructure topology
- Genealogical data, recommendation engines
- Any domain where anything is potentially related to everything

**Databases:** Neo4j, Memgraph, KùzuDB, Amazon Neptune, TigerGraph, Apache AGE
(on PostgreSQL)

## Event Sourcing (with CQRS)

Data is written as an **append-only log of immutable events** (the source of
truth). Read-optimized **materialized views** are derived from the event log.
Write model and read models are separated (CQRS).

**Pros:**

- Events communicate intent clearly ("booking was canceled" vs. cryptic row
  updates)
- Materialized views are reproducible: delete and recompute from the same events
- Multiple views optimized for different query patterns, using any data model
- Easy to add new features by chaining behaviors off existing events
- Errors can be corrected by appending deletion/compensation events
- Built-in audit log
- High write throughput (sequential append)

**Cons:**

- External/non-deterministic data (e.g., exchange rates) must be captured at
  write time for reproducibility
- GDPR deletion of personal data in immutable logs is complex (requires
  crypto-shredding or per-user logs)
- Reprocessing events with external side effects (e.g., sending emails) requires
  care
- Additional complexity of maintaining derived views and ensuring they process
  events in order
- Eventual consistency between the event log and materialized views

**Typical use cases:**

- Complex business domains (conference management, e-commerce orders, financial
  transactions)
- Systems requiring full audit trails (regulated industries)
- Domains where requirements evolve frequently and new read patterns emerge
- High-write-throughput systems with bursty load

**Databases/Frameworks:** EventStoreDB, MartenDB (on PostgreSQL), Axon
Framework, Apache Kafka (as event log), Datomic
