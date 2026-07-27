# 1257. Smallest Common Region

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/smallest-common-region](https://leetcode.com/problems/smallest-common-region)
**Companies:** Airbnb, Amazon, Tiktok

---

## Problem Description

You are given a list of `regions` where each list starts with a parent region followed by its direct children. Given two regions `region1` and `region2`, return their **smallest common region** (lowest common ancestor in the region hierarchy).

### Examples

**Example 1:**
- **Input:** `regions = [["Earth","North America","South America"],["North America","United States","Canada"],["United States","New York","Boston"],["Canada","Ontario","Quebec"],["South America","Brazil"]]`, `region1 = "Quebec"`, `region2 = "New York"`
- **Output:** `"North America"`

### Constraints

- `2 <= regions.length <= 10⁴`
- `2 <= regions[i].length <= 20`
- All region names are unique.
- `region1 != region2`

---

## Approach: LCA via Parent Map — O(n) ✅

Build a parent map from the region hierarchy. Then find the LCA by collecting all ancestors of `region1`, then walking up from `region2` until we hit one.

This is identical to finding the **lowest common ancestor** in a tree represented by parent pointers.

```
FUNCTION findSmallestRegion(regions, region1, region2):
    parent = {}
    FOR r IN regions:
        FOR i ← 1 TO len(r) - 1: parent[r[i]] = r[0]

    ancestors = set()
    curr = region1
    WHILE curr:
        ancestors.ADD(curr)
        curr = parent.get(curr)

    curr = region2
    WHILE curr NOT IN ancestors: curr = parent[curr]
    RETURN curr
```

### Walkthrough — `region1 = "Quebec"`, `region2 = "New York"`

- Ancestors of Quebec: Quebec → Canada → North America → Earth
- Walk from New York: New York → United States → **North America** (found in ancestors!)

Result: `"North America"`

| Time | Space |
|------|-------|
| O(n) | O(n) |
