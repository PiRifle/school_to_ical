
export default async function fetchClasses(lessonPlan: string): Promise<{classes:string[], url: string}> {
    const url = new URL("api/classes.php", document.location.toString());
    url.searchParams.append("plan_url", lessonPlan);
    const res = await fetch(url)
    if (!(res.status > 199 && res.status < 299)) throw new Error("link not working");
    return await res.json()
}
