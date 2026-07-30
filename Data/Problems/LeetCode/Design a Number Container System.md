# 2349. Design a Number Container System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-a-number-container-system](https://leetcode.com/problems/design-a-number-container-system)
**Companies:** Google

---

## Problem Description

Design a system: `change(index, number)` sets the number at an index, `find(number)` returns the smallest index with that number (or -1).

---

## Examples

**Example 1:**
```
Operations: ["NumberContainers","change","change","find","change","find"]
Arguments: [[],[1,2],[2,2],[2],[3,1],[2]]
Output: [null,null,null,1,null,3]
Explanation:
NumberContainers nc = new NumberContainers();
nc.change(1,2); // index 1 now holds 2
nc.change(2,2); // index 2 now holds 2
nc.find(2); // returns 1, the smallest index with number 2
nc.change(3,1); // index 3 now holds 1
nc.find(2); // still returns 1
```

**Example 2:**
```
Operations: ["NumberContainers","find","change","find"]
Arguments: [[],[5],[5,5],[5]]
Output: [null,-1,null,5]
Explanation:
Initially no index holds number 5, so find returns -1.
After change(5,5), index 5 holds 5, so find returns 5.
```

---

## Approach

```
CLASS NumberContainers:
    indexToNum = {}                    // index → number
    numToIndices = defaultdict(SortedList)  // number → sorted set of indices

    FUNCTION change(index, number):
        IF index IN indexToNum:
            oldNum = indexToNum[index]
            numToIndices[oldNum].REMOVE(index)
        indexToNum[index] = number
        numToIndices[number].ADD(index)

    FUNCTION find(number):
        IF numToIndices[number]: RETURN numToIndices[number][0]
        RETURN -1
```

---

## Walkthrough

| Step | Operation | Effect on `indexToNum` | Effect on `numToIndices` |
|------|-----------|-----------------------|--------------------------|
| 1 | `change(1,2)` | {1:2} | {2:[1]}
| 2 | `change(2,2)` | {1:2,2:2} | {2:[1,2]}
| 3 | `find(2)` | – | returns first element of list → 1 |
| 4 | `change(3,1)` | {1:2,2:2,3:1} | {2:[1,2], 1:[3]}
| 5 | `find(2)` | – | still returns 1 |

---

## Complexity Analysis

- **Time:** `change` – O(log n) for updating the sorted list; `find` – O(1) to peek first element.
- **Space:** O(n) to store mappings for all indices.

---

## Follow-Up Questions

- How would you modify the design to support `findAll(number)` returning all indices?
- Can you achieve O(1) amortized time for `change` using a different data structure?
- How would you handle deletions of indices?

---

## Key Takeaway

> **Dual map design: index→number for updates, number→SortedSet of indices for fast minimum‑index retrieval.**