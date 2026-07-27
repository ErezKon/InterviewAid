# 981. Time Based Key-Value Store

**Difficulty:** 🟡 Medium
**Acceptance:** 49.0%
**LeetCode:** [https://leetcode.com/problems/time-based-key-value-store](https://leetcode.com/problems/time-based-key-value-store)
**Companies:** Airbnb, Amazon, Anduril, Apple, Axon, Bloomberg, Citadel, Cockroach Labs, Coinbase, Compass, Confluent, Crowdstrike, Databricks, Ebay, Flexport, Google, Gusto, Instacart, Liveramp, Lyft, Meta, Microsoft, Mongodb, Netflix, Openai, Oracle, Palantir, Ramp 2, Salesforce, Snowflake, Tiktok, Uber, Verkada, Vmware

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: HashMap + Binary Search — O(log n) ✅](#3-approach-hashmap--binary-search--olog-n-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

Design a time-based key-value data structure that can store multiple values for the same key at different timestamps and retrieve the key's value at a certain timestamp.

Implement the `TimeMap` class:
- `TimeMap()` — Initializes the object.
- `set(key, value, timestamp)` — Stores `key` with `value` at the given `timestamp`.
- `get(key, timestamp)` — Returns the value set for `key` at the largest timestamp ≤ the given `timestamp`. If no such value, return `""`.

**Constraints:**
- All timestamps of `set` are **strictly increasing** for the same key.
- `1 <= timestamp <= 10⁷`
- At most `2 × 10⁵` calls to `set` and `get`.

---

## 2. Examples

```
Input:
  ["TimeMap", "set", "get", "get", "set", "get", "get"]
  [[], ["foo","bar",1], ["foo",1], ["foo",3], ["foo","bar2",4], ["foo",4], ["foo",5]]

Output: [null, null, "bar", "bar", null, "bar2", "bar2"]

Explanation:
  set("foo", "bar", 1)   → stored
  get("foo", 1)           → "bar"
  get("foo", 3)           → "bar" (largest timestamp ≤ 3 is 1)
  set("foo", "bar2", 4)   → stored
  get("foo", 4)           → "bar2"
  get("foo", 5)           → "bar2" (largest timestamp ≤ 5 is 4)
```

---

## 3. Approach: HashMap + Binary Search — O(log n) ✅

### Key Insight

Since timestamps are strictly increasing per key, each key's values are already sorted by timestamp. Store them in a list and use **binary search** for `get`.

### Pseudocode

```
CLASS TimeMap:
    CONSTRUCTOR:
        store = {}          // key → list of (timestamp, value)

    FUNCTION set(key, value, timestamp):
        IF key NOT IN store:
            store[key] = []
        store[key].APPEND((timestamp, value))

    FUNCTION get(key, timestamp):
        IF key NOT IN store:
            RETURN ""

        pairs = store[key]

        // Binary search: largest timestamp ≤ given timestamp
        lo = 0
        hi = len(pairs) - 1
        result = ""

        WHILE lo <= hi:
            mid = (lo + hi) / 2
            IF pairs[mid].timestamp <= timestamp:
                result = pairs[mid].value
                lo = mid + 1
            ELSE:
                hi = mid - 1

        RETURN result
```

---

## 4. Walkthrough

```
set("foo", "bar", 1)   → store = {"foo": [(1,"bar")]}
set("foo", "bar2", 4)  → store = {"foo": [(1,"bar"), (4,"bar2")]}

get("foo", 3):
  pairs = [(1,"bar"), (4,"bar2")]
  Binary search for timestamp ≤ 3:
    lo=0, hi=1, mid=0: pairs[0].ts=1 ≤ 3 → result="bar", lo=1
    lo=1, hi=1, mid=1: pairs[1].ts=4 > 3 → hi=0
    lo=1 > hi=0 → return "bar" ✅

get("foo", 5):
  Binary search for timestamp ≤ 5:
    lo=0, hi=1, mid=0: 1 ≤ 5 → result="bar", lo=1
    lo=1, hi=1, mid=1: 4 ≤ 5 → result="bar2", lo=2
    lo=2 > hi=1 → return "bar2" ✅
```

---

## 5. Complexity Analysis

| Operation | Time |
|-----------|------|
| set | O(1) amortized |
| get | O(log n) |
| **Space** | **O(n)** total entries |

---

## 6. Follow-Up Questions

### 6.1 What if timestamps aren't strictly increasing?

Use a balanced BST (TreeMap) per key instead of a sorted list. Insert is O(log n), and finding the floor entry is O(log n).

### 6.2 What if we need to delete entries?

With a list, deletion by timestamp requires binary search + shifting (O(n)). With a balanced BST, deletion is O(log n).

### 6.3 How to handle this in a distributed system?

Use a distributed sorted map (like Apache Cassandra's wide rows). Each key maps to a sorted set of (timestamp, value) pairs across nodes. Reads use the coordinator to find the most recent entry.

### 6.4 Snapshot Array (LeetCode #1146)?

Similar idea: each index has a list of (snap_id, value). Binary search for the latest snap_id ≤ the query snap_id.

---

## Key Takeaway

> **Sorted list + binary search** is the go-to for time-series data with monotonically increasing timestamps. The `set` call is O(1) (append to sorted order), and `get` is O(log n) via binary search for the floor value. This pattern appears in versioned data stores and snapshot-based systems.
