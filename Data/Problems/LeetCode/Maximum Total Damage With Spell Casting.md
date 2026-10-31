# 3186. Maximum Total Damage With Spell Casting

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-total-damage-with-spell-casting](https://leetcode.com/problems/maximum-total-damage-with-spell-casting)
**Companies:** Amazon, Bloomberg, Citadel, Google, Meta, Microsoft, Phonepe

---

## Problem Description

> *Note: the Approach below only excludes `dmg − 1`, but officially casting `d` forbids `d ± 1` **and** `d ± 2`. Fix: when taking `uniqueVals[i]`, combine with the last index `j` where `uniqueVals[j] < dmg − 2`.*

A magician has various spells.

You are given an array `power`, where each element represents the damage of a spell. Multiple spells can have the same damage value.

It is a known fact that if a magician decides to cast a spell with a damage of `power[i]`, they **cannot** cast any spell with a damage of `power[i] - 2`, `power[i] - 1`, `power[i] + 1`, or `power[i] + 2`.

Each spell can be cast **only once**.

Return the **maximum** possible *total damage* that a magician can cast.

**Constraints:**
- `1 <= power.length <= 10^5`
- `1 <= power[i] <= 10^9`

## Examples

**Example 1:**
```
Input: power = [1,1,3,4]
Output: 6
Explanation: The maximum possible damage of 6 is produced by casting spells 0, 1, 3 with damage 1, 1, 4.
```

**Example 2:**
```
Input: power = [7,1,6,6]
Output: 13
Explanation: The maximum possible damage of 13 is produced by casting spells 1, 2, 3 with damage 1, 6, 6.
```

## Approach
**Dynamic Programming with Value Compression** – Group spells by damage, sort unique damages, and apply a DP similar to the House Robber problem where adjacent damage values cannot both be taken.

```text
FUNCTION MaximumTotalDamage(power):
    // Count occurrences of each damage value
    SET countMap ← MAP from damage → frequency
    FOR dmg IN power:
        INCREMENT countMap[dmg]
    // Sort unique damage values
    SET uniqueVals ← LIST of keys in countMap SORTED ASCENDING
    SET m ← LENGTH(uniqueVals)
    SET dp ← ARRAY of size m+1 INITIALIZED TO 0
    FOR i ← 0 TO m-1:
        SET dmg ← uniqueVals[i]
        SET total ← dmg * countMap[dmg]
        // Find previous index j where uniqueVals[j] < dmg - 1
        SET j ← -1
        FOR k ← i-1 DOWNTO 0:
            IF uniqueVals[k] < dmg - 1:
                SET j ← k
                BREAK
        SET take ← total + (dp[j+1] IF j ≥ 0 ELSE 0)
        SET skip ← dp[i]
        SET dp[i+1] ← MAX(take, skip)
    RETURN dp[m]
```

## Walkthrough
Consider `power = [2,2,3,3,3,4]`.
1. Count map: `{2:2, 3:3, 4:1}`.
2. Unique sorted values: `[2,3,4]`.
3. DP steps:
   - i=0 (dmg=2): total=2*2=4, j=-1 → take=4, skip=0 → dp[1]=4.
   - i=1 (dmg=3): total=3*3=9, j=-1 (no value <2) → take=9, skip=dp[1]=4 → dp[2]=9.
   - i=2 (dmg=4): total=4*1=4, j=0 (value 2 < 3) → take=4+dp[1]=8, skip=dp[2]=9 → dp[3]=9.
Result = 9.

## Complexity Analysis
- **Time:** `O(n + m log m)` where `n` is length of `power` (building count map) and `m` is number of distinct damage values (sorting and DP).
- **Space:** `O(m)` for the count map, sorted list, and DP array.

## Follow-Up Questions
1. How would the solution adapt if the forbidden difference were `k` instead of `1`?
2. Can you extend the DP to also return the actual set of chosen spells?
3. What changes are needed if each spell also has a cooldown period after casting?

## Key Takeaway
Compressing values and applying a House-Robber style DP efficiently handles the “no adjacent damage” constraint.
