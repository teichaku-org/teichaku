import { AppInfo } from "@/constants/AppInfo"
import { Button, Group } from "@mantine/core"

const Page = () => {

    return <div>
        <h1>404 Not Found</h1>
        <Group >
            <Button
                size="xl"
                variant="gradient"
                gradient={{ from: 'blue', to: 'grape' }}
                component="a"
                href="/demo/season1/history"
            >
                Try Demo
            </Button>

            <Button
                component="a"
                size="xl"
                variant="default"
                href={AppInfo.inqueryUrl}
            >
                Create Your DAO
            </Button>
        </Group>
    </div>
}

export default Page