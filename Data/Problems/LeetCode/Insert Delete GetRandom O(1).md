# 380. Insert Delete GetRandom O(1)

**Difficulty:** 🟡 Medium
**Acceptance:** 55.0%
**LeetCode:** [https://leetcode.com/problems/insert-delete-getrandom-o1](https://leetcode.com/problems/insert-delete-getrandom-o1)
**Companies:** Affirm, Agoda, Amazon, Apple, Axon, Bloomberg, Bytedance, Cisco, Citadel, Coupang, De Shaw, Docusign, Doordash, Google, Grammarly, Intuit, Ixigo, Ixl, Linkedin, Meta, Microsoft, Nvidia, Okta, Oracle, Palo Alto Networks, Peloton, Pocket Gems, Pure Storage, Quora, Roblox, Rubrik, Snowflake, Sofi, Tiktok, Twitter, Uber, Yandex, Yelp, Zeta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: ArrayList + HashMap — O(1) ✅](#3-approach-arraylist--hashmap--o1-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

Implement the `RandomizedSet` class:
- `RandomizedSet()` — Initializes the object.
- `insert(val)` — Inserts `val` if not present. Returns `true` if inserted, `false` otherwise.
- `remove(val)` — Removes `val` if present. Returns `true` if removed, `false` otherwise.
- `getRandom()` — Returns a random element. Each element must have an **equal probability** of being returned.

You must implement all functions in **average O(1)** time complexity.

**Constraints:**
- `-2³¹ <= val <= 2³¹ - 1`
- At most `2 × 10⁵` calls will be made.
- There will be **at least one** element when `getRandom` is called.

---

## 2. Examples

```
Input:
  ["RandomizedSet","insert","remove","insert","getRandom","remove","insert","getRandom"]
  [[],[1],[2],[2],[],[1],[2],[]]

Output: [null,true,false,true,2,true,false,2]
```

---

## 3. Approach: ArrayList + HashMap — O(1) ✅

### Key Insight

- **HashMap** gives O(1) insert/remove/lookup.
- **ArrayList** gives O(1) random access (pick random index).
- Combine both: the map stores `value → index in list`. The list stores the actual values.

### Trick for O(1) Removal

To remove from the middle of an array in O(1): **swap** the element to delete with the **last element**, update the map, then pop the last element.

### Pseudocode

```
CLASS RandomizedSet:
    CONSTRUCTOR:
        list = []              // stores values
        map  = {}              // value → index in list

    FUNCTION insert(val):
        IF val IN map:
            RETURN false
        map[val] = len(list)
        list.APPEND(val)
        RETURN true

    FUNCTION remove(val):
        IF val NOT IN map:
            RETURN false

        // Swap with last element
        idx = map[val]
        lastVal = list[len(list) - 1]

        list[idx] = lastVal
        map[lastVal] = idx

        // Remove last element
        list.POP()
        DELETE map[val]
        RETURN true

    FUNCTION getRandom():
        randomIndex = RANDOM(0, len(list) - 1)
        RETURN list[randomIndex]
```

---

## 4. Walkthrough

```
insert(1): list=[1], map={1:0}           → true
remove(2): 2 not in map                  → false
insert(2): list=[1,2], map={1:0, 2:1}    → true
getRandom(): random from [1,2]           → 1 or 2
remove(1): swap 1 with last (2)
           list=[2], map={2:0}            → true
insert(2): 2 already in map              → false
getRandom(): only [2]                    → 2
```

---

## 5. Complexity Analysis

| Operation | Time | Space |
|-----------|------|-------|
| insert | O(1) avg | O(n) |
| remove | O(1) avg | O(n) |
| getRandom | O(1) | — |

---

## 6. Follow-Up Questions

### 6.1 Insert Delete GetRandom O(1) — Duplicates Allowed (LeetCode #381)?

Change the map to store `value → set of indices`. On removal, swap one of the indices with the last element. Carefully update the index sets.

### 6.2 What if we need weighted random selection?

Store weights alongside values. Use a prefix sum array and binary search for weighted random selection. Or use an alias table for O(1) sampling after O(n) preprocessing.

### 6.3 How to implement this in a distributed system?

Partition data across nodes. Each node maintains its own list+map. For getRandom, first pick a random node (weighted by size), then pick a random element from that node.

### 6.4 What about thread safety?

Use a read-write lock: `getRandom` and lookups take a read lock; `insert` and `remove` take a write lock. Alternatively, use a concurrent hash map with a copy-on-write list.

---

## Key Takeaway

> The **array + hash map** combination is the standard pattern for O(1) insert/remove/random. The critical trick is **swap-with-last** for O(1) array deletion. This pattern appears in shuffle algorithms, reservoir sampling, and many system design problems.
