import Project from '@/config/models/Project';
import { NextResponse } from 'next/server';

export const POST = async (req: any) => {
    const { body } = req;
    const project = await addProject(body);
    if (project) {
        return NextResponse.json({ project: project, status: 200 });
    } else {
        return NextResponse.json({ message: "Project not found", status: 404 });
    }
}

async function addProject(body: any) {
    const project = await Project.create(body);
    if (project) {
        return project;
    }
    return null;
}