# 3629. Minimum Jumps to Reach End via Prime Teleportation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-jumps-to-reach-end-via-prime-teleportation](https://leetcode.com/problems/minimum-jumps-to-reach-end-via-prime-teleportation)
**Companies:** Amazon, Google, Meta, Uber

---

## Problem Description

> *Note: the Approach below teleports from any index sharing a prime factor and never takes adjacent steps. Officially you may step to `i ± 1`, and you may teleport only **from** an index whose value is itself a prime `p`, **to** indices `j` with `nums[j] % p == 0`. Run BFS with both move types, precomputing the indices divisible by each prime with a sieve and using each prime's teleport list once.*

You are given an integer array `nums` of length `n`.

You start at index 0, and your goal is to reach index `n - 1`.

From any index `i`, you may perform one of the following operations:

- **Adjacent Step**: Jump to index `i + 1` or `i - 1`, if the index is within bounds.
- **Prime Teleportation**: If `nums[i]` is a prime number `p`, you may instantly jump to any index `j != i` such that `nums[j] % p == 0`.

Return the **minimum** number of jumps required to reach index `n - 1`.

**Constraints:**
- `1 <= n == nums.length <= 10^5`
- `1 <= nums[i] <= 10^6`

---

## Approach: BFS on Prime Factor Groups — O(n·√M) ✅

Group indices by each prime factor they contain. Treat each prime factor as a virtual node that connects all indices sharing it. Perform BFS starting from index 0, expanding through prime‑factor nodes. Mark visited primes to avoid re‑processing large groups.

```text
FUNCTION minJumps(nums):
    n ← LEN(nums)
    // Build mapping prime → list of indices
    primeToIndices ← MAP()
    FOR i FROM 0 TO n-1:
        FOR each prime p IN primeFactors(nums[i]):
            primeToIndices[p].APPEND(i)

    visitedIdx ← SET()          // visited indices
    visitedPrime ← SET()        // visited prime groups
    queue ← [(0, 0)]             // (index, jumps)
    visitedIdx.ADD(0)

    WHILE queue NOT EMPTY:
        (idx, jumps) ← queue.DEQUEUE()
        IF idx == n-1:
            RETURN jumps
        FOR each prime p IN primeFactors(nums[idx]):
            IF p IN visitedPrime:
                CONTINUE
            visitedPrime.ADD(p)
            FOR neighbor IN primeToIndices[p]:
                IF neighbor NOT IN visitedIdx:
                    visitedIdx.ADD(neighbor)
                    queue.ENQUEUE((neighbor, jumps + 1))

    RETURN -1
```

---

## Examples

**Example 1:**
```
Input: nums = [1,2,4,6]
Output: 2
Explanation: One optimal sequence of jumps is:
- Start at index i = 0. Take an adjacent step to index 1.
- At index i = 1, nums[1] = 2 is a prime number. Therefore, we teleport to index i = 3 as nums[3] = 6 is divisible by 2.
Thus, the answer is 2.
```

**Example 2:**
```
Input: nums = [2,3,4,7,9]
Output: 2
Explanation: One optimal sequence of jumps is:
- Start at index i = 0. Take an adjacent step to index i = 1.
- At index i = 1, nums[1] = 3 is a prime number. Therefore, we teleport to index i = 4 since nums[4] = 9 is divisible by 3.
Thus, the answer is 2.
```

**Example 3:**
```
Input: nums = [4,6,5,8]
Output: 3
Explanation: - Since no teleportation is possible, we move through 0 → 1 → 2 → 3. Thus, the answer is 3.
```

---

## Walkthrough

Consider `nums = [2,3,6,7]`.
1. Build prime groups: `{2: [0,2]}, {3: [1,2]}, {5: []}, {7: [3]}`.
2. BFS queue starts with `(0,0)`. Visited indices `{0}`.
3. Dequeue `(0,0)`. Prime factors of `2` → `{2}`. Expand prime `2` → neighbors `[0,2]`. Index 2 not visited → enqueue `(2,1)`. Mark prime `2` visited.
4. Dequeue `(2,1)`. Prime factors of `6` → `{2,3}`. Prime `2` already visited. Expand prime `3` → neighbors `[1,2]`. Index 1 not visited → enqueue `(1,2)`. Mark prime `3` visited.
5. Dequeue `(1,2)`. Prime factors of `3` → `{3}` (already visited). No new nodes.
6. Dequeue `(3,2)` would be reached when expanding from index 2 via prime `7` (if present). Since `7` not connected, the BFS ends with target reached at jumps 2.

---

## Complexity Analysis

- **Time:** Factorizing each number `O(√M)` where `M` is max element, plus BFS over at most `n + totalPrimeGroups` edges → `O(n·√M)`.
- **Space:** Mapping of primes to indices and visited sets → `O(n)`.

---

## Follow-Up Questions

1. How would the solution change if jumps could also be made to indices sharing a **composite** factor?
2. Can the algorithm be adapted to return the actual jump path, not just the count?
3. What is the impact on complexity if the array size is up to `10^5` and numbers up to `10^9`?

---

## Key Takeaway

> When connectivity is defined by shared prime factors, group indices by primes and perform BFS through those groups, marking visited primes to avoid redundant expansions.
