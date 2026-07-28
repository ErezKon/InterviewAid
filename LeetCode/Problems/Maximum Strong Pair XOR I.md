# 2932. Maximum Strong Pair XOR I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-strong-pair-xor-i](https://leetcode.com/problems/maximum-strong-pair-xor-i)
**Companies:** Zscaler

---

## Problem Description
Given an array `nums` of non‑negative integers, a **strong pair** is a pair of indices `(i, j)` with `i < j` such that `nums[i] & nums[j] == nums[i]`. Compute the maximum possible value of `nums[i] XOR nums[j]` among all strong pairs. If no strong pair exists, return `0`.

## Examples
**Example 1**
```
Input: nums = [0,1,2,3]
Output: 3
Explanation: The strong pairs are (0,1), (0,2), (0,3), (1,3), (2,3). The maximum XOR is 0 XOR 3 = 3.
```
**Example 2**
```
Input: nums = [5,1,2]
Output: 0
Explanation: No pair satisfies the strong condition, so the answer is 0.
```

## Approach
The condition `nums[i] & nums[j] == nums[i]` means all set bits of `nums[i]` are also set in `nums[j]`; thus `nums[i]` is a bitwise subset of `nums[j]`. To maximize `nums[i] XOR nums[j]`, we want the largest possible difference in bits.
1. Sort the array in descending order. Larger numbers are more likely to contain the bits of smaller numbers.
2. Iterate over each element as a potential `nums[i]`. For each, scan later elements (smaller or equal) to find the first `nums[j]` where `nums[i] & nums[j] == nums[j]` (i.e., `nums[j]` is a subset of `nums[i]`).
3. Compute XOR and keep the maximum.
Because the array size is limited (≤ 10⁵) and each number fits in 30 bits, a trie of bits can be used to find the best partner in `O(30)` per element.

```text
FUNCTION maxStrongPairXOR(nums):
    // Build a binary trie of all numbers
    trie ← NEW Trie()
    FOR num IN nums:
        INSERT(trie, num)
    maxXor ← 0
    FOR num IN nums:
        // Query for a number that is a subset of `num`
        partner ← QUERY_SUBSET(trie, num)
        IF partner IS NOT NULL:
            maxXor ← MAX(maxXor, num XOR partner)
    RETURN maxXor

FUNCTION INSERT(trie, num):
    node ← trie.root
    FOR bitPos ← 30 DOWNTO 0:
        bit ← (num >> bitPos) & 1
        IF node.child[bit] IS NULL:
            node.child[bit] ← NEW TrieNode()
        node ← node.child[bit]
    node.isEnd ← TRUE
    node.value ← num

FUNCTION QUERY_SUBSET(trie, num):
    // Walk the trie, only following branches where the bit in `num` is 1 or 0 accordingly
    node ← trie.root
    best ← NULL
    FOR bitPos ← 30 DOWNTO 0:
        IF node IS NULL: BREAK
        bit ← (num >> bitPos) & 1
        // Prefer the opposite bit to maximize XOR, but only if that branch's numbers are subsets
        IF bit = 1 AND node.child[0] IS NOT NULL:
            node ← node.child[0]
        ELSE IF node.child[bit] IS NOT NULL:
            node ← node.child[bit]
        ELSE:
            BREAK
    IF node IS NOT NULL AND node.isEnd:
        best ← node.value
    RETURN best
```

## Walkthrough
Take `nums = [0,1,2,3]`.
1. Insert all numbers into the trie.
2. For `num = 3 (11₂)`, the query follows the branch `0` at the most significant bit (since `3` has 1 there, we can take 0 to maximize XOR) and finds `0`. XOR = 3.
3. For `num = 2 (10₂)`, the best subset partner is `0`; XOR = 2, which is less than current max.
4. The maximum XOR found is `3`.

## Complexity Analysis
*Time*: Building the trie `O(n·B)` and each query `O(B)`, where `B = 31` (bits). Overall `O(n·B)` ≈ `O(n)`.
*Space*: Trie stores at most `n·B` nodes → `O(n·B)`.

## Follow‑Up Questions
1. How would the solution change if the strong pair condition were `nums[i] | nums[j] == nums[j]`?
2. Can you solve the problem without a trie, using sorting and bit‑mask checks?
3. How would you extend the approach to return the pair of indices, not just the XOR value?

## Key Takeaway
A bitwise‑subset relationship lets us use a binary trie to efficiently locate the partner that maximizes XOR while respecting the strong‑pair constraint.
