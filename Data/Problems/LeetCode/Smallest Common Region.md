# 1257. Smallest Common Region

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/smallest-common-region](https://leetcode.com/problems/smallest-common-region)
**Companies:** Airbnb, Amazon, Tiktok

---

## Problem Description

You are given some lists of `regions` where the first region of each list **directly** contains all other regions in that list.

If a region `x` contains a region `y` *directly*, and region `y` contains region `z` *directly*, then region `x` is said to contain region `z` **indirectly**. Note that region `x` also **indirectly** contains all regions **indirectly** contained in `y`.

Naturally, if a region `x` contains (either *directly* or *indirectly*) another region `y`, then `x` is bigger than or equal to `y` in size. Also, by definition, a region `x` contains itself.

Given two regions: `region1` and `region2`, return *the smallest region that contains both of them*.

It is guaranteed the smallest region exists.

### Examples

```
Example 1:
  Input: regions = [["Earth","North America","South America"],
                    ["North America","United States","Canada"],
                    ["United States","New York","Boston"],
                    ["Canada","Ontario","Quebec"],
                    ["South America","Brazil"]],
         region1 = "Quebec", region2 = "New York"
  Output: "North America"
```

```
Example 2:
  Input: regions = [["Earth","North America","South America"],["North America","United States","Canada"],["United States","New York","Boston"],["Canada","Ontario","Quebec"],["South America","Brazil"]], region1 = "Canada", region2 = "South America"
  Output: "Earth"
```

### Constraints

- `2 <= regions.length <= 10⁴`
- `2 <= regions[i].length <= 20`
- `1 <= regions[i][j].length, region1.length, region2.length <= 20`
- `region1 != region2`
- `regions[i][j]`, `region1`, and `region2` consist of English letters.
- The input is generated such that there exists a region which contains all the other regions, either directly or indirectly.
- A region cannot be directly contained in more than one region.

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
