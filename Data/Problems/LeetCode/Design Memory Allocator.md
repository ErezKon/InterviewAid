# 2502. Design Memory Allocator

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-memory-allocator](https://leetcode.com/problems/design-memory-allocator)
**Companies:** Amazon, Apple, Bytedance, Capital One, Meta, Microsoft, Nvidia, Openai, Qualcomm, Roblox, Rubrik, Sig, Tesla, Tiktok, Two Sigma, Uber, Visa

---

## Problem Description

You are given an integer `n` representing the size of a **0-indexed** memory array. All memory units are initially free.

You have a memory allocator with the following functionalities:

1. **Allocate** a block of `size` consecutive free memory units and assign it the id `mID`.
2. **Free** all memory units with the given id `mID`.

**Note** that:

- Multiple blocks can be allocated to the same `mID`.
- You should free all the memory units with `mID`, even if they were allocated in different blocks.

Implement the `Allocator` class:

- `Allocator(int n)` Initializes an `Allocator` object with a memory array of size `n`.
- `int allocate(int size, int mID)` Find the **leftmost** block of `size` **consecutive** free memory units and allocate it with the id `mID`. Return the block's first index. If such a block does not exist, return `-1`.
- `int freeMemory(int mID)` Free all memory units with the id `mID`. Return the number of memory units you have freed.

**Constraints:**
- `1 <= n, size, mID <= 1000`
- At most `1000` calls will be made to `allocate` and `freeMemory`.

---

## Approach: Array Simulation — O(n) per operation ✅

```text
CLASS Allocator:
    CONSTRUCTOR(n):
        memory ← [0] * n

    FUNCTION allocate(size, mID):
        consecutive ← 0
        FOR i ← 0 TO n - 1:
            IF memory[i] = 0:
                consecutive ← consecutive + 1
                IF consecutive = size:
                    FOR j ← i - size + 1 TO i:
                        memory[j] ← mID
                    RETURN i - size + 1
            ELSE:
                consecutive ← 0
        RETURN -1

    FUNCTION freeMemory(mID):
        count ← 0
        FOR i ← 0 TO n - 1:
            IF memory[i] = mID:
                memory[i] ← 0
                count ← count + 1
        RETURN count
```

---

## Examples

```
Example 1:
  Input:
  ["Allocator", "allocate", "allocate", "allocate", "freeMemory", "allocate", "allocate", "allocate", "freeMemory", "allocate", "freeMemory"]
  [[10], [1, 1], [1, 2], [1, 3], [2], [3, 4], [1, 1], [1, 1], [1], [10, 2], [7]]
  Output:
  [null, 0, 1, 2, 1, 3, 1, 6, 3, -1, 0]
  Explanation:
  Allocator loc = new Allocator(10); // Initialize a memory array of size 10. All memory units are initially free.
  loc.allocate(1, 1);   // The leftmost block's first index is 0. Memory: [1,_,_,_,_,_,_,_,_,_]. Return 0.
  loc.allocate(1, 2);   // The leftmost block's first index is 1. Memory: [1,2,_,_,_,_,_,_,_,_]. Return 1.
  loc.allocate(1, 3);   // The leftmost block's first index is 2. Memory: [1,2,3,_,_,_,_,_,_,_]. Return 2.
  loc.freeMemory(2);    // Free all memory units with mID 2. Memory: [1,_,3,_,_,_,_,_,_,_]. Return 1.
  loc.allocate(3, 4);   // The leftmost block's first index is 3. Memory: [1,_,3,4,4,4,_,_,_,_]. Return 3.
  loc.allocate(1, 1);   // The leftmost block's first index is 1. Memory: [1,1,3,4,4,4,_,_,_,_]. Return 1.
  loc.allocate(1, 1);   // The leftmost block's first index is 6. Memory: [1,1,3,4,4,4,1,_,_,_]. Return 6.
  loc.freeMemory(1);    // Free all memory units with mID 1. Memory: [_,_,3,4,4,4,_,_,_,_]. Return 3.
  loc.allocate(10, 2);  // No block of 10 consecutive free units can be found. Return -1.
  loc.freeMemory(7);    // Free all memory units with mID 7. Memory unchanged. Return 0.
```

---

## Walkthrough

1. **Initialize** with 10 free units (`memory = [0,0,0,0,0,0,0,0,0,0]`).
2. `allocate(3,1)` scans from left, finds three consecutive zeros at indices 0-2, sets them to `1`. Memory becomes `[1,1,1,0,0,0,0,0,0,0]`.
3. `allocate(4,2)` continues scanning, finds four zeros at 3-6, sets them to `2`. Memory becomes `[1,1,1,2,2,2,2,0,0,0]`.
4. `freeMemory(1)` iterates, resets indices 0-2 to `0`, counting three freed units.
5. `allocate(5,3)` now sees only a block of three zeros (0-2) and a block of three zeros (7-9); no block of size 5, so returns `-1`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) per `allocate` and `freeMemory` due to linear scan |
| **Space** | O(n) to store the memory array |

---

## Follow-Up Questions

- How could you improve allocation to O(log n) using a segment tree or balanced interval tree?
- How would you support merging adjacent free blocks efficiently?
- Can you design a thread-safe allocator for concurrent allocations?

---

## Key Takeaway

> **Array simulation with a consecutive-free counter finds the leftmost fit. For better performance, maintain a free-list of intervals or use a balanced tree of gaps.**
