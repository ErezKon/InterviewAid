# 2622. Cache With Time Limit

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/cache-with-time-limit](https://leetcode.com/problems/cache-with-time-limit)
**Companies:** Amazon, Confluent, Google, Microsoft, Netflix, Oracle, Uber

---

## Problem Description
Design a cache that stores key‑value pairs, each with an associated time‑to‑live (TTL) in milliseconds. The `set` operation inserts or updates a key with a value and TTL, resetting its timer. The `get` operation returns the value if the key exists and has not expired, otherwise -1. The `count` operation returns the number of unexpired entries currently in the cache.

## Examples
- After `set(1, 42, 1000)`, `get(1)` within 500 ms returns `42`; after 1500 ms it returns `-1`.
- Calling `set(2, 7, 2000)` when key `2` already exists overwrites the value and restarts its timer.
- `count()` reflects only keys whose TTL has not yet elapsed.

## Approach: Hash Map with Timers — O(1) per operation ✅

```text
CLASS TimeLimitedCache:
    // Map key → {value, expiryTime}
    CONSTRUCTOR():
        cache ← MAP()

    FUNCTION set(key, value, duration):
        now ← CURRENT_TIME_MS()
        expiry ← now + duration
        exists ← cache.CONTAINS(key)
        cache[key] ← {value: value, expiry: expiry}
        RETURN exists

    FUNCTION get(key):
        now ← CURRENT_TIME_MS()
        IF NOT cache.CONTAINS(key): RETURN -1
        entry ← cache[key]
        IF now > entry.expiry: 
            cache.REMOVE(key)
            RETURN -1
        RETURN entry.value

    FUNCTION count():
        now ← CURRENT_TIME_MS()
        // Remove expired entries lazily
        FOR key, entry IN LIST(cache.ITEMS()):
            IF now > entry.expiry:
                cache.REMOVE(key)
        RETURN SIZE(cache)
```

## Walkthrough
1. `set(1, 5, 1000)` stores `{value:5, expiry: now+1000}`.
2. After 600 ms, `get(1)` checks `now < expiry` → returns `5`.
3. After another 500 ms (total 1100 ms), `get(1)` sees `now > expiry`, removes key, returns `-1`.
4. `count()` iterates over remaining entries, discarding any that have expired.

## Complexity Analysis
- **Time:** O(1) average for `set` and `get`; `count` is O(k) where k is current number of keys (lazy cleanup).
- **Space:** O(k) for storing active entries.

## Follow‑Up Questions
1. How would you modify the design to support bulk expiration without iterating over all keys?
2. Can you implement the cache with O(log n) expiration using a priority queue?
3. How would you make the cache thread‑safe for concurrent access?

## Key Takeaway
Combining a hash map for constant‑time lookups with stored expiry timestamps provides an efficient time‑limited cache.
