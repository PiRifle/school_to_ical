
export default async function fetchLessonPlan (lessonPlan: string, _class: string): Promise<string> {
    const url = new URL("api/lesson_plan.php", document.location.toString());
    url.searchParams.append("plan_url", lessonPlan);
    url.searchParams.append("class", _class);
    const res = await fetch(url)
    if (!(res.status > 199 && res.status < 299)) alert("error fetching website, check link before proceeding");
    return await res.text()
}
