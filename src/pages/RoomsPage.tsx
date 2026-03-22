import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { supabase } from "@/api/supabaseClient";
import { Badge } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { HStack, Stack } from "@/components/ui/stack";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Heading, Text } from "@/components/ui/text";

type Room = {
	id: string;
	code: string;
	status: "lobby" | "in_progress" | "finished";
	target_player_count: number;
	current_bloc: number;
	current_screen_position: number;
	created_at: string;
	room_players: {
		player_id: string;
		display_name: string | null;
		role_id: string | null;
	}[];
};

const STATUS_VARIANT: Record<string, "default" | "secondary" | "outline"> = {
	lobby: "outline",
	in_progress: "default",
	finished: "secondary",
};

const useRooms = () =>
	useQuery({
		queryKey: ["rooms"],
		queryFn: async () => {
			const { data, error } = await supabase
				.from("rooms")
				.select("*, room_players(player_id, display_name, role_id)")
				.order("created_at", { ascending: false })
				.limit(50);
			if (error) throw error;
			return data as Room[];
		},
	});

const RoomsPage = () => {
	const { t } = useTranslation();
	const { data: rooms, isLoading, error } = useRooms();

	const statusLabel = (status: string) =>
		t(`rooms.${status === "in_progress" ? "inProgress" : status}`);

	const stats = rooms
		? [
				{ label: t("rooms.total"), value: rooms.length },
				{
					label: t("rooms.lobby"),
					value: rooms.filter((r) => r.status === "lobby").length,
				},
				{
					label: t("rooms.inProgress"),
					value: rooms.filter((r) => r.status === "in_progress").length,
				},
				{
					label: t("rooms.finished"),
					value: rooms.filter((r) => r.status === "finished").length,
				},
			]
		: null;

	return (
		<Stack className="gap-6">
			<Box>
				<Heading>{t("rooms.title")}</Heading>
				<Text muted>{t("rooms.subtitle")}</Text>
			</Box>

			{stats && (
				<Box className="grid gap-4 sm:grid-cols-4">
					{stats.map((s) => (
						<Card key={s.label}>
							<CardContent className="pt-6">
								<Text size="sm" muted>
									{s.label}
								</Text>
								<Text className="text-2xl font-bold">{s.value}</Text>
							</CardContent>
						</Card>
					))}
				</Box>
			)}

			<Card>
				<CardHeader>
					<CardTitle className="text-base">{t("rooms.recentRooms")}</CardTitle>
				</CardHeader>
				<CardContent>
					{isLoading && (
						<Stack className="gap-2">
							{["s1", "s2", "s3", "s4", "s5"].map((id) => (
								<Skeleton key={id} className="h-10 w-full" />
							))}
						</Stack>
					)}

					{error && (
						<Text size="sm" className="text-destructive">
							{t("rooms.loadError", { message: (error as Error).message })}
						</Text>
					)}

					{rooms && rooms.length === 0 && (
						<Text size="sm" muted>
							{t("rooms.noRooms")}
						</Text>
					)}

					{rooms && rooms.length > 0 && (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>{t("rooms.code")}</TableHead>
									<TableHead>{t("rooms.status")}</TableHead>
									<TableHead>{t("rooms.players")}</TableHead>
									<TableHead>{t("rooms.bloc")}</TableHead>
									<TableHead>{t("rooms.screen")}</TableHead>
									<TableHead>{t("rooms.createdAt")}</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{rooms.map((room) => (
									<TableRow key={room.id}>
										<TableCell className="font-mono font-medium">
											{room.code}
										</TableCell>
										<TableCell>
											<Badge variant={STATUS_VARIANT[room.status] ?? "outline"}>
												{statusLabel(room.status)}
											</Badge>
										</TableCell>
										<TableCell>
											<HStack className="gap-1 flex-wrap">
												{room.room_players.map((p) => (
													<Badge
														key={p.player_id}
														variant="secondary"
														className="text-xs"
													>
														{p.display_name ?? p.player_id}
														{p.role_id && ` (${p.role_id})`}
													</Badge>
												))}
											</HStack>
										</TableCell>
										<TableCell>{room.current_bloc}</TableCell>
										<TableCell>{room.current_screen_position}</TableCell>
										<TableCell>
											<Text size="sm" muted>
												{new Date(room.created_at).toLocaleDateString("fr-FR", {
													day: "2-digit",
													month: "2-digit",
													hour: "2-digit",
													minute: "2-digit",
												})}
											</Text>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>
		</Stack>
	);
};

export default RoomsPage;
