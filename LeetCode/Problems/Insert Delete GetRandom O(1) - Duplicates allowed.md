# 381. Insert Delete GetRandom O(1) - Duplicates allowed

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/insert-delete-getrandom-o1-duplicates-allowed](https://leetcode.com/problems/insert-delete-getrandom-o1-duplicates-allowed)
**Companies:** Affirm, Amazon, Bloomberg, Google, Linkedin, Meta, Microsoft, Okta, Peloton, Tiktok, Uber, Yelp

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Array + Map of Sets — O(1) avg ✅](#4-approach-array--map-of-sets--o1-avg-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Design a data structure `RandomizedCollection` that supports duplicate elements and provides:

- `insert(val)` — Inserts `val`. Returns `true` if the collection did **not** already contain it.
- `remove(val)` — Removes **one** occurrence of `val` if present. Returns `true` if removed.
- `getRandom()` — Returns a random element with probability **proportional to its count** (i.e., an element appearing 3 times is 3× as likely to be returned as one appearing once).

All operations must run in **average O(1)** time.

**Constraints:**
- `-2³¹ <= val <= 2³¹ - 1`
- At most `2 × 10⁵` calls total.
- There is at least one element when `getRandom` is called.

---

## 2. Examples

```
Input:
  ["RandomizedCollection","insert","insert","insert","getRandom","remove","getRandom"]
  [[],[1],[1],[2],[],[1],[]]

Output: [null,true,false,true,2,true,1]

Explanation:
  insert(1): [1]         → true  (first time)
  insert(1): [1,1]       → false (already present)
  insert(2): [1,1,2]     → true
  getRandom(): 1 or 2    (1 has 2/3 probability, 2 has 1/3)
  remove(1):  [1,2]      → true
  getRandom(): 1 or 2    (equal probability)
```

---

## 3. Key Insight

Extension of **LeetCode #380**: instead of mapping `value → single index`, map `value → set of indices`. This handles duplicates while still allowing the **swap-with-last** trick for O(1) removal. The tricky edge case is when the element being removed **is** the last element — the index bookkeeping must handle this gracefully.

---

## 4. Approach: Array + Map of Sets — O(1) avg ✅

```
CLASS RandomizedCollection:
    CONSTRUCTOR:
        vals = []
        idxMap = {}    // val → set of indices

    FUNCTION insert(val):
        idxMap.setdefault(val, set()).ADD(len(vals))
        vals.ADD(val)
        RETURN len(idxMap[val]) == 1

    FUNCTION remove(val):
        IF val NOT IN idxMap OR len(idxMap[val]) == 0: RETURN false

        idx = idxMap[val].POP_ANY()
        lastVal = vals[-1]

        // Swap with last element
        vals[idx] = lastVal
        idxMap[lastVal].ADD(idx)
        idxMap[lastVal].REMOVE(len(vals) - 1)

        vals.POP()
        IF len(idxMap[val]) == 0: DELETE idxMap[val]
        RETURN true

    FUNCTION getRandom():
        RETURN random.choice(vals)
```

---

## 5. Walkthrough

```
insert(1): vals=[1],     idxMap={1:{0}}           → true
insert(1): vals=[1,1],   idxMap={1:{0,1}}         → false
insert(2): vals=[1,1,2], idxMap={1:{0,1}, 2:{2}}  → true

remove(1):
  Pop index 1 from idxMap[1] → idx=1
  lastVal = vals[2] = 2
  Swap: vals[1] = 2 → vals=[1,2,2]
  Update: idxMap[2].add(1), idxMap[2].remove(2) → {1}
  Pop last: vals=[1,2]
  idxMap = {1:{0}, 2:{1}}                         → true

getRandom(): pick from [1,2] → equal probability
```

---

## 6. Complexity Analysis

| Operation | Time | Space |
|-----------|------|-------|
| insert | O(1) avg | O(n) |
| remove | O(1) avg | O(n) |
| getRandom | O(1) | — |

---

## 7. Follow-Up Questions

### 7.1 How does this differ from #380 (no duplicates)?

The map stores a **set** of indices per value instead of a single index. Insert returns `true` only when the set was empty. Removal pops any index from the set.

### 7.2 Why does swap-with-last still work?

The swap only moves one element (the last). We update the last element's index set by removing its old position and adding the new one. The order within the index set doesn't matter.

### 7.3 What if the removed element is at the last position?

We pop the index, then "swap" it with itself. The add/remove on the set cancel out. This edge case works correctly because we add the new index before removing the old one.

---

## 8. Key Takeaway

> Extending the array + hash map O(1) design to support duplicates requires replacing the single-index map with a **set-of-indices map**. The swap-with-last deletion trick still applies — just be careful with the index set updates when the target element is the last element.
