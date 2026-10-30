import json, re, sys, html, urllib.request, urllib.parse

def gql(slug):
    q = 'query{question(titleSlug:"%s"){questionFrontendId title isPaidOnly content}}' % slug
    req = urllib.request.Request("https://leetcode.com/graphql", data=json.dumps({"query": q}).encode(),
                                 headers={"Content-Type": "application/json", "Referer": "https://leetcode.com", "User-Agent": "Mozilla/5.0"})
    return json.load(urllib.request.urlopen(req, timeout=30))["data"]["question"]

def to_md(h):
    h = re.sub(r"<sup>(.*?)</sup>", r"^\1", h)
    h = re.sub(r"<sub>(.*?)</sub>", r"_\1", h)
    h = re.sub(r"</?(code)>", "`", h)
    h = re.sub(r"</?(strong|b)[^>]*>", "**", h)
    h = re.sub(r"</?(em|i)>", "*", h)
    h = re.sub(r"<li>\s*", "- ", h)
    h = re.sub(r"<img[^>]*src=\"([^\"]+)\"[^>]*>", r"![img](\1)", h)
    h = re.sub(r"<pre>", "```\n", h)
    h = re.sub(r"</pre>", "\n```", h)
    h = re.sub(r"<[^>]+>", "", h)
    h = html.unescape(h).replace("\u00a0", " ").replace("\u202f", " ")
    return re.sub(r"\n{3,}", "\n\n", h).strip()

def doocs(fid, title):
    n = int(fid); lo = n // 100 * 100
    folder = "%04d-%04d" % (lo, lo + 99)
    titles = [title, re.sub(r"\s+", " ", title.replace(":", "")).strip()]
    for i, t in enumerate(titles):
        name = "%04d.%s" % (n, t)
        url = "https://raw.githubusercontent.com/doocs/leetcode/main/solution/%s/%s/README_EN.md" % (folder, urllib.parse.quote(name))
        try:
            txt = urllib.request.urlopen(url, timeout=30).read().decode(); break
        except urllib.error.HTTPError:
            if i == len(titles) - 1: raise
    m = re.search(r"<!-- description:start -->(.*?)<!-- description:end -->", txt, re.S)
    return to_md(m.group(1) if m else txt)

slug = sys.argv[1]
q = gql(slug)
print("ID:", q["questionFrontendId"], "| Title:", q["title"], "| Paid:", q["isPaidOnly"])
if q["content"]:
    print(to_md(q["content"]))
else:
    print("[doocs]")
    print(doocs(q["questionFrontendId"], q["title"]))
